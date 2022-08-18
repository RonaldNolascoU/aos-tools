const COLLECTION_NAME = 'AOS'
const INVENTORY_LENGTH = 15
const RANK_DATA = [
  {
    rank: 'Recruit',
    daily: 2,
    partner_daily: 3,
    matching_partner_daily: 4,
    upgrade_1_5_cost: 240,
    upgrade_2_cost: 480,
    items: [
      ['darkness', 51 / 1000],
      ['you_lose', 949 / 1000, true]
    ]
  }, // totalNft, totalDaily
  {
    rank: 'Scout',
    daily: 2.5,
    partner_daily: 3.75,
    matching_partner_daily: 5,
    upgrade_1_5_cost: 300,
    upgrade_2_cost: 600,
    items: [
      ['darkness', 13 / 1000],
      ['you_lose', 987 / 1000, true]
    ]
  },
  {
    rank: 'Technician',
    daily: 3,
    partner_daily: 4.5,
    matching_partner_daily: 6,
    upgrade_1_5_cost: 360,
    upgrade_2_cost: 720,
    items: [
      ['darkness', 29 / 2500],
      ['you_lose', 2471 / 2500, true]
    ]
  },
  {
    rank: 'Engineer',
    daily: 3.5,
    partner_daily: 5.25,
    matching_partner_daily: 7,
    upgrade_1_5_cost: 420,
    upgrade_2_cost: 840,
    items: [
      ['darkness', 41 / 5000],
      ['you_lose', 4959 / 5000, true]
    ]
  },
  {
    rank: 'Scientist',
    daily: 4,
    partner_daily: 6,
    matching_partner_daily: 8,
    upgrade_1_5_cost: 480,
    upgrade_2_cost: 960,
    items: [
      ['darkness', 17 / 2500],
      ['you_lose', 2483 / 2500, true]
    ]
  },
  {
    rank: 'Commander',
    daily: 5,
    partner_daily: 7.5,
    matching_partner_daily: 10,
    upgrade_1_5_cost: 600,
    upgrade_2_cost: 1200,
    items: [
      ['darkness', 23 / 5000],
      ['you_lose', 4977 / 5000, true]
    ]
  },
  {
    rank: 'Ambassador',
    daily: 5,
    items: [
      ['darkness', 1 / 625],
      ['you_lose', 624 / 625, true]
    ]
  },
  {
    rank: 'Special',
    daily: 5,
    items: [
      ['darkness', 1 / 625],
      ['you_lose', 624 / 625, true]
    ]
  },
  {
    rank: 'Captain',
    daily: 6,
    partner_daily: 9,
    matching_partner_daily: 12,
    upgrade_1_5_cost: 720,
    upgrade_2_cost: 1440,
    items: [
      ['darkness', 2 / 625],
      ['you_lose', 623 / 625, true]
    ]
  },
  {
    rank: 'Admiral',
    daily: 7.5,
    partner_daily: 11.25,
    matching_partner_daily: 15,
    upgrade_1_5_cost: 900,
    upgrade_2_cost: 1800,
    items: [
      ['darkness', 1 / 625],
      ['you_lose', 624 / 625, true]
    ]
  }
]
const TAX = {
  1: 0.6,
  2: 0.5,
  3: 0.4,
  4: 0.3,
  5: 0.2,
  6: 0.1,
  7: 0
}
const PARTNER_SYMBOLS = {
  ART: 'ArtPunk',
  DA: 'Dope Apes',
  DRONIES: 'Dronie',
  EID: 'Ernest In Disguise',
  KAM1: 'KAM1',
  Meerkat: 'Meerkat',
  NOOT: 'Pesky Penguins',
  PSG: 'Piggy Sol Gang',
  PI: 'Pixelinvader',
  NFTPro: 'Pixelinvader',
  SolPunks: 'SolPunk_',
  'SR-G': 'Super Racer - Genesis',
  FSHP: 'OG Fellow',
  UNIREXCITY: 'Unirex',
  DAPE: 'Degen Ape',
  DTP: 'Degen Trash Panda',
  BASC: 'Bored Ape Solana Club',
  BSL: 'Blocksmith Labs',
  CHILL: 'Origin of',
  DEGEN: 'DeGen',
  DD: 'DOJO DEGEN',
  JCATS: 'JungleCats',
  JCATSL: 'Lioness',
  SMB: 'SMB',
  'Sovana Egg': 'Sovanian Egg',
  FRAME: 'Frame',
  THUG: 'THUG',
  'Lotus Lad': ['Lotus Lad', 'Lotus Lady']
}
const SECOND_MINT_FACTIONS = [
  'Degenerate Ape Academy',
  'Bored Ape Solana Club',
  'Blocksmith Labs',
  'Chillchat',
  'DeGens',
  'Degen Dojo',
  'Jungle Cats',
  'Lotus Gang',
  'SMB',
  'SOVANA',
  'Thugbirdz',
  'Special'
]
const MATCHING_PARTNER_MAP = {
  'Ernest in Disguise': 'Ernest in Disguise',
  'The Fellowship': 'OG Fellow',
  SolPunks: 'SolPunk_',
  Unirexcity: 'Unirex',
  'Piggy Sol Gang': 'PSG', // coming soon, may need to use symbol to check as name only contains id
  'Dope Apes': 'Dope Apes',
  KAM1: 'KAM1',
  'Meerkat Millionaires Country Club': 'Meerkat',
  'Pesky Penguins': 'Pesky Penguins',
  ArtPunks: ['ArtPunk', 'Frame'],
  Dronies: 'Dronie',
  'Super Racer': 'Super Racer',
  'Pixel Invaderz': 'Pixelinvader',
  'Bored Ape Solana Club': 'Bored Ape Solana Club',
  'Blocksmith Labs': 'Blocksmith Labs',
  DeGens: 'DeGen',
  'Degen Dojo': 'DOJO DEGEN',
  SMB: 'SMB',
  SOVANA: 'Sovanian Egg',
  Thugbirdz: 'THUG',
  'Degenerate Ape Academy': ['Degen Trash Panda', 'Degen Ape'],
  'Lotus Gang': 'Lotus Lad',
  Chillchat: 'Origin of',
  'Jungle Cats': ['JungleCats', 'Lioness']
}
/*  we can use it to check matching nft:
  const isMatching = nft.data.name.includes(MATCHING_PARTNER_MAP[Faction])
  const isPartner = !isMatching && Object.values(MATCHING_PARTNER_MAP).some((n) => nft.data.name.includes(n))
*/

const BOOST_RANGE = [1, 3]

const WEAPONS = {
  'Degenerate Ape Academy': 'ape-rifle',
  'Dope Apes': 'banana-knife',
  'Bored Ape Solana Club': 'banana-nunchuk',
  KAM1: 'bejewled-spear',
  Unirexcity: 'bone-whip',
  Chillchat: 'chill-hammer',
  'Degen Dojo': 'dead-chicken',
  'Meerkat Millionaires Country Club': 'deadly-frisbee',
  'Ernest in Disguise': 'double-katana',
  SOVANA: 'egg-staff',
  'Blocksmith Labs': 'emerald-mace',
  'Lotus Gang': 'flaming-katana',
  '': 'golden-ak',
  Thugbirdz: 'golden-gun',
  'Pixel Invaderz': 'gravity-gun',
  'Piggy Sol Gang': 'ham-shank',
  'Jungle Cats': 'jungle-spear',
  DeGens: 'magical-unicorn',
  'The Fellowship': 'orb-staff',
  SMB: 'peanut-popgun',
  '': 'short-sword',
  Dronies: 'slingshot',
  SolPunks: 'sock-full-of-rocks',
  ArtPunks: 'the-pipe',
  'Super Racer': 'wrench',
  'Pesky Penguins': 'yellow-snowball'
}

const MISSIONS = [
  'solarium_mines',
  'crash_landing',
  'the_ruins',
  'the_lab',
  'cloning_chamber',
  'barracks'
]

const SOLARIUM_MINES_TIME = {
  duration: 7,
  duration_unit: 'days',
  conversion_rate: 86400
}

const LOOT_SETTINGS = {
  crash_landing: {
    items: [
      ['red_cap', 1 / 20], //5%
      ['chance_cube', 1 / 25], //4%
      ['beans', 3 / 100], //3%
      ['backpack', 1 / 25], //4%
      ['door_key_card', 1 / 200], //0.5%
      ['you_lose', 167 / 200, true] //83.50%
    ],
    conditions: {
      conditional_items: ['door_key_card'],
      extra_items: [
        ['floppy_disk', 1 / 5000] //0.02%
      ],
      update_items: [
        ['you_lose', 2087 / 2500, true] //83.48%
      ]
    },
    solarium: [0, 1],
    duration: 4,
    duration_unit: 'hours',
    conversion_rate: 3600
  },

  the_ruins: {
    items: [
      ['orion_galaxy', 1 / 25], //4%
      ['laptop', 1 / 20], //5%
      ['anti_gravity_boots', 3 / 100], //3%
      ['endless_artifact', 1 / 200], //0.5%
      ['what_if_machine', 1 / 10000], //0.01%
      ['you_lose', 8749 / 10000, true] //87.49%
    ],
    conditions: {
      conditional_items: ['endless_artifact'],
      extra_items: [
        ['psu', 1 / 5000] //0.02%
      ],
      update_items: [
        ['you_lose', 8747 / 10000, true] //87.47%
      ]
    },
    solarium: [0, 1],
    duration: 6,
    duration_unit: 'hours',
    conversion_rate: 3600
  },

  the_lab: {
    items: [
      ['universal_translator', 1 / 20], //5%
      ['solarium_container', 1 / 25], //4%
      ['solarium_whiskey', 3 / 100], //3%
      ['eyeball', 1 / 200], //0.5%
      ['you_lose', 7 / 8, true] //87.5%
    ],
    conditions: {
      conditional_items: ['eyeball'],
      extra_items: [
        ['hard_drive', 1 / 5000] //0.02%
      ],
      update_items: [
        ['you_lose', 2187 / 2500, true] //87.48%
      ]
    },
    solarium: [0, 1],
    duration: 8,
    duration_unit: 'hours',
    conversion_rate: 3600
  },

  cloning_chamber: {
    items: [
      ['visor', 3 / 100], //3%
      ['shotgun', 1 / 100], //1%
      ['chainsaw', 1 / 50], //2%
      ['underpants', 1 / 500], //0.2%
      ['you_lose', 469 / 500, true] //93.8%
    ],
    conditions: {
      conditional_items: [],
      extra_items: [],
      update_items: []
    },
    solarium: [0, 1],
    duration: 6,
    duration_unit: 'hours',
    conversion_rate: 3600
  },

  barracks: {
    items: [
      ['neutralizer', 3 / 100], //3%
      ['taser', 1 / 50], //2%
      ['smith', 1 / 100], //1%
      ['cartridge', 1 / 200], //0.5%
      ['?????', 1 / 5000], //0.02%
      ['you_lose', 2337 / 2500, true] //93.48%
    ],
    conditions: {
      conditional_items: [],
      extra_items: [],
      update_items: []
    },
    solarium: [0, 1],
    duration: 8,
    duration_unit: 'hours',
    conversion_rate: 3600
  }
}

const LOOT_STATS = {
  //crash_landing
  red_cap: {
    value: 5, //5%
    type: 'loot'
  },
  chance_cube: {
    value: 6, //6%
    type: 'income'
  },
  beans: {
    value: 8, //8%
    type: 'mission_time'
  },

  //the_ruins
  orion_galaxy: {
    value: 8, //8%
    type: 'income'
  },
  laptop: {
    value: 6, //6%
    type: 'loot'
  },
  anti_gravity_boots: {
    value: 10, //10%
    type: 'mission_time'
  },

  //the_lab
  solarium_container: {
    value: 10, // 10%
    type: 'income'
  },
  universal_translator: {
    value: 8, // 8%
    type: 'loot'
  },
  solarium_whiskey: {
    value: 10, //10%
    type: 'mission_time'
  }
}

const ALLOWED_STATS = [
  //crash_landing
  'red_cap',
  'chance_cube',
  'beans',

  //the_ruins
  'orion_galaxy',
  'laptop',
  'anti_gravity_boots',

  //the_lab
  'universal_translator',
  'solarium_container',
  'solarium_whiskey'
]

const MISSIONS_WITH_LOOT = [
  'Crash Landing',
  'The Ruins',
  'The Lab',
  'Barracks',
  'Cloning Chamber'
]

module.exports = {
  COLLECTION_NAME,
  RANK_DATA,
  TAX,
  PARTNER_SYMBOLS,
  SECOND_MINT_FACTIONS,
  MATCHING_PARTNER_MAP,
  LOOT_SETTINGS,
  LOOT_STATS,
  ALLOWED_STATS,
  MISSIONS_WITH_LOOT,
  INVENTORY_LENGTH,
  WEAPONS,
  SOLARIUM_MINES_TIME,
  MISSIONS,
  BOOST_RANGE
}
