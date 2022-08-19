const { RANK_DATA, TAX, MATCHING_PARTNER_MAP } = require('./config')
const solanaWeb3 = require('@solana/web3.js')
const NFTs = require('@primenums/solana-nft-tools')

const solanaWeb3Connection = new solanaWeb3.Connection(
  'https://solana--mainnet.datahub.figment.io/apikey/4cc2595baf46b88bef7ab0ce015ec5a3',
  'confirmed'
)

let stakedDays = 0
let harvestAmount = 0

const checkIfNFTBelongsToUser = async (data) => {
  const nfts = await NFTs.getMintTokensByOwner(
    solanaWeb3Connection,
    data.wallet_address
  )

  userNFTs = nfts
  const userHasNFT = nfts.find((nft) => nft == data.partner_mint_address)
  return userHasNFT
}

const getDifferenceBetweenDates = (start, end) => {
  return Math.round(Math.abs(end - start) / (1000 * 3600 * 24))
}

const dailyValue = (currentNFT) => {
  const { attributes } = currentNFT
  const { value: Rank } = attributes.find((a) => a.trait_type === 'Rank') || {}
  const { daily = 2 } = RANK_DATA.find((r) => r.rank === Rank) || {}

  console.log({ daily })

  return daily
}

const getAccumulated = (currentNFT) => {
  const initialDate = new Date('17 feb 2022')
  const today = new Date()
  const difference = getDifferenceBetweenDates(initialDate, today)
  return currentNFT?.claimed ? 0 : difference * dailyValue(currentNFT)
}

const getStakedDays = () => {
  return stakedDays
}

const getStakedDate = (currentNFT) => {
  return currentNFT.staked_at
}

const getNFTMultiplierBoost = (nft) => {
  const { attributes } = nft
  const { value } = attributes.find((a) => a.trait_type === 'Boost') || {}
  if (value) {
    const [boostNumber] = value.includes('X') ? value.split('X') : ['', 1]
    return Number(boostNumber)
  }
  return 1
}

const getPartnerValue = (Faction, partnerName) => {
  if (!partnerName) return false
  const val = MATCHING_PARTNER_MAP[Faction]

  if (Array.isArray(val)) {
    const partner = val.find((x) => partnerName?.includes(x.toLowerCase()))
    return partner || false
  }
  return partnerName?.includes(val?.toLowerCase())
}

const hasMatchingPartner = (nft, partner) => {
  const { Faction = '' } = nft
  let partnerNFT = false

  if (!partner?.data?.name || ['Piggy Sol Gang', 'DeGens'].includes(Faction)) {
    const partnerName = partner?.data?.name?.toLowerCase()
    const symbol = partner?.data?.symbol?.toLowerCase()
    const val = MATCHING_PARTNER_MAP[Faction]
    const partnerVal = symbol || partnerName

    if (!partnerVal) {
      partnerNFT = false
    } else if (Array.isArray(val)) {
      const partner = val.find((x) => partnerVal?.includes(x.toLowerCase()))
      partnerNFT = partner || false
    } else {
      partnerNFT = partnerVal?.includes(val?.toLowerCase())
    }
  } else {
    const partnerName = partner?.data?.name?.toLowerCase()
    partnerNFT = getPartnerValue(Faction, partnerName)
  }
  return partnerNFT
}
const getPartnerNFT = async (data) => {
  const nft = await NFTs.getNFTByMintAddress(
    solanaWeb3Connection,
    data.partner_mint_address
  )
  return nft
}

const multiplier = async (currentNFT) => {
  const boostNumber = getNFTMultiplierBoost(currentNFT)
  console.log({ boostNumber })
  if (boostNumber != 1) {
    return boostNumber
  }

  const stakeHasBoost = currentNFT?.multiplier_boost
  console.log({ stakeHasBoost })
  if (stakeHasBoost) {
    console.log({ currentNFT })
    const userHasPartner = await checkIfNFTBelongsToUser(currentNFT)
    console.log({ userHasPartner })
    return userHasPartner ? stakeHasBoost : 1
  }

  const hasPartner = currentNFT.partner_mint_address
    ? hasMatchingPartner(currentNFT, getPartnerNFT(currentNFT))
    : false

  console.log({ hasPartner })
  if (hasPartner) {
    return 2
  }
  const checkIfPartnerStillBelongsToUser = await checkIfNFTBelongsToUser(
    currentNFT
  )

  console.log({ checkIfPartnerStillBelongsToUser })
  if (checkIfPartnerStillBelongsToUser) {
    return 1.5
  }
  return 1
}

const getPercentage = (currentNFT) => {
  const staked_at = getStakedDate(currentNFT)
  const [start, today, end] = [
    new Date(staked_at),
    new Date(),
    new Date(staked_at).setDate(new Date(staked_at).getDate() + 7)
  ]

  let difference = getDifferenceBetweenDates(today, start)
  difference = difference > 7 ? 7 : difference
  stakedDays = difference

  return (Math.abs(today - start) / Math.abs(end - start)) * 100
}

const perDay = async (currentNFT) => {
  const multiplierAmount = await multiplier(currentNFT)
  console.log({ multiplierAmount }, dailyValue(currentNFT))
  return multiplierAmount * dailyValue(currentNFT)
}

const getEarned = async (currentNFT) => {
  const p = isMissionEnd(currentNFT) ? 100 : getPercentage(currentNFT)
  const pct = p / 100
  const pd = await perDay(currentNFT)
  let calculated = pd * 7 * pct

  console.log({ pct, pd, calculated })

  let income = currentNFT?.stats?.income
  income = income > 0 ? calculated + calculated * (income / 100) : calculated
  console.log({ income })
  return income
}

const getCurrentDay = (currentNFT) => {
  const p = getPercentage(currentNFT) / 100
  const day = Math.ceil(7 * p)
  return day > 7 ? 7 : day
}

const getMinedSolarium = async (currentNFT) => {
  if (!currentNFT.claimed) {
    return (await getEarned(currentNFT)) + getAccumulated(currentNFT)
  }
  return await getEarned(currentNFT)
}

const getHarvestAmount = () => {
  return harvestAmount
}

const calculateTax = async (currentNFT) => {
  const currentDay = getCurrentDay(currentNFT)
  console.log({ currentDay })
  const t = TAX[currentDay]
  console.log(t, 'TAX')
  const minedSolarium = await getMinedSolarium(currentNFT)
  const calculatedTax = minedSolarium * t

  harvestAmount = minedSolarium - calculatedTax
  console.log({ calculatedTax, harvestAmount, minedSolarium })
  return calculatedTax
}

const isMissionEnd = (stake) => {
  const stakedAt = new Date(Date.parse(stake?.staked_at))
  let durationInSeconds = 7 * 86400
  if (stake?.mission_duration && stake?.mission_conversion_rate) {
    durationInSeconds =
      Number(stake?.mission_duration) * Number(stake?.mission_conversion_rate)
  }

  if (stake?.stats?.mission_time > 0) {
    durationInSeconds =
      durationInSeconds - durationInSeconds * (stake?.stats?.mission_time / 100)
  }

  const countdown = stakedAt.setSeconds(
    stakedAt.getSeconds() + durationInSeconds
  )

  return +new Date() > countdown
}

module.exports = {
  getAccumulated,
  calculateTax,
  isMissionEnd,
  getStakedDays,
  getHarvestAmount,
  getMinedSolarium,
  getCurrentDay,
  getEarned,
  perDay,
  dailyValue,
  getPercentage,
  multiplier,
  getPartnerNFT,
  hasMatchingPartner,
  getPartnerValue,
  getNFTMultiplierBoost,
  getStakedDate
}
