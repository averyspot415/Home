const CATEGORIES = [
  {
    id: "official",
    label: "Official",
    summary: "Visitor bureaus, airport information, and local transit resources."
  },
  {
    id: "hotels",
    label: "Hotels",
    summary: "Hotel search, airport stays, and neighborhood lodging options."
  },
  {
    id: "food",
    label: "Food",
    summary: "Restaurants, reservations, coffee, markets, and local dining areas."
  },
  {
    id: "shopping",
    label: "Shopping",
    summary: "Retail districts, malls, boutiques, outlets, and local makers."
  },
  {
    id: "nightlife",
    label: "Nightlife",
    summary: "Bars, live music, comedy clubs, lounges, and late-night districts."
  },
  {
    id: "sports",
    label: "Sports",
    summary: "Teams, stadiums, arenas, sports bars, and ticket discovery."
  },
  {
    id: "events",
    label: "Events",
    summary: "Concerts, festivals, theater, tours, and date-based city happenings."
  },
  {
    id: "wellness",
    label: "Wellness",
    summary: "Spas, parks, fitness studios, trails, and healthy travel stops."
  },
  {
    id: "family",
    label: "Family",
    summary: "Museums, zoos, aquariums, parks, and kid-friendly attractions."
  },
  {
    id: "videos",
    label: "Videos",
    summary: "Travel guides, neighborhood tours, food videos, and city previews."
  }
];

function encodeQuery(value) {
  return encodeURIComponent(String(value).trim());
}

function makeMapLink(city, query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeQuery(`${city} ${query}`)}`;
}

function makeYoutubeLink(city, query) {
  return `https://www.youtube.com/results?search_query=${encodeQuery(`${city} ${query}`)}`;
}

function makeTravelLink(city, type) {
  return `https://www.google.com/travel/search?q=${encodeQuery(`${city} ${type}`)}`;
}

function createLink(label, url, type) {
  return { label, url, type };
}

function createMetro(config) {
  const city = `${config.name}, ${config.state}`;
  const baseLinks = {
    official: [
      createLink("Official visitor guide", config.visitorUrl, "Official"),
      createLink("Airport information", config.airportUrl, "Airport"),
      createLink("Public transit", config.transitUrl, "Transit")
    ],
    hotels: [
      createLink("Search hotels", makeTravelLink(city, "hotels"), "Travel"),
      createLink("Hotel map", makeMapLink(city, "hotels"), "Maps"),
      createLink("Airport hotels", makeMapLink(city, "airport hotels"), "Maps")
    ],
    food: [
      createLink("Reserve restaurants", `https://www.opentable.com/s?term=${encodeQuery(city)}`, "Reservations"),
      createLink("Restaurant map", makeMapLink(city, "restaurants"), "Maps"),
      createLink("Coffee and markets", makeMapLink(city, "coffee shops food halls farmers markets"), "Maps")
    ],
    shopping: [
      createLink("Shopping map", makeMapLink(city, "shopping"), "Maps"),
      createLink("Malls and outlets", makeMapLink(city, "malls outlets"), "Maps"),
      createLink("Local boutiques", makeMapLink(city, "local boutiques"), "Maps")
    ],
    nightlife: [
      createLink("Nightlife map", makeMapLink(city, "nightlife"), "Maps"),
      createLink("Live music", makeMapLink(city, "live music"), "Maps"),
      createLink("Comedy and late night", makeMapLink(city, "comedy clubs late night"), "Maps")
    ],
    sports: [
      createLink("Sports tickets", `https://www.ticketmaster.com/search?q=${encodeQuery(`${city} sports`)}`, "Tickets"),
      createLink("Stadiums and arenas", makeMapLink(city, "stadiums arenas"), "Maps"),
      createLink("Sports bars", makeMapLink(city, "sports bars"), "Maps")
    ],
    events: [
      createLink("Event tickets", `https://www.ticketmaster.com/search?q=${encodeQuery(city)}`, "Tickets"),
      createLink("Concerts and theater", makeMapLink(city, "concerts theater events"), "Maps"),
      createLink("Festivals and tours", makeTravelLink(city, "events festivals tours"), "Travel")
    ],
    wellness: [
      createLink("Spas and wellness", makeMapLink(city, "spas wellness"), "Maps"),
      createLink("Parks and trails", makeMapLink(city, "parks trails"), "Maps"),
      createLink("Fitness studios", makeMapLink(city, "fitness studios yoga"), "Maps")
    ],
    family: [
      createLink("Family attractions", makeTravelLink(city, "family attractions"), "Travel"),
      createLink("Museums and zoos", makeMapLink(city, "museums zoos aquariums"), "Maps"),
      createLink("Kid-friendly parks", makeMapLink(city, "kid friendly parks"), "Maps")
    ],
    videos: [
      createLink("City travel videos", makeYoutubeLink(city, "travel guide"), "YouTube"),
      createLink("Food and neighborhoods", makeYoutubeLink(city, "food neighborhoods"), "YouTube"),
      createLink("Things to do videos", makeYoutubeLink(city, "things to do"), "YouTube")
    ]
  };

  return { ...config, links: baseLinks };
}

const METROS = [
  createMetro({
    rank: 1,
    slug: "new-york",
    name: "New York",
    state: "NY",
    region: "Northeast",
    summary: "A global capital for arts, finance, food, fashion, theater, parks, and neighborhood discovery.",
    tags: ["Broadway", "Museums", "Dining", "Transit"],
    visitorUrl: "https://www.nyctourism.com/",
    airportUrl: "https://www.panynj.gov/airports/en/index.html",
    transitUrl: "https://new.mta.info/"
  }),
  createMetro({
    rank: 2,
    slug: "los-angeles",
    name: "Los Angeles",
    state: "CA",
    region: "West",
    summary: "A sprawling creative capital known for film, beaches, food, music, design, and diverse neighborhoods.",
    tags: ["Hollywood", "Beaches", "Food", "Arts"],
    visitorUrl: "https://www.discoverlosangeles.com/",
    airportUrl: "https://www.flylax.com/",
    transitUrl: "https://www.metro.net/"
  }),
  createMetro({
    rank: 3,
    slug: "chicago",
    name: "Chicago",
    state: "IL",
    region: "Midwest",
    summary: "A lakefront architecture, food, sports, comedy, museum, and music powerhouse.",
    tags: ["Architecture", "Lakefront", "Comedy", "Sports"],
    visitorUrl: "https://www.choosechicago.com/",
    airportUrl: "https://www.flychicago.com/",
    transitUrl: "https://www.transitchicago.com/"
  }),
  createMetro({
    rank: 4,
    slug: "dallas-fort-worth",
    name: "Dallas-Fort Worth",
    state: "TX",
    region: "South",
    summary: "A fast-growing North Texas metro with business districts, sports, arts, barbecue, and western heritage.",
    tags: ["Sports", "Arts", "Barbecue", "Business"],
    visitorUrl: "https://www.visitdallas.com/",
    airportUrl: "https://www.dfwairport.com/",
    transitUrl: "https://www.dart.org/"
  }),
  createMetro({
    rank: 5,
    slug: "houston",
    name: "Houston",
    state: "TX",
    region: "South",
    summary: "A diverse Gulf Coast hub for food, museums, space history, medicine, sports, and international culture.",
    tags: ["Space", "Dining", "Museums", "Sports"],
    visitorUrl: "https://www.visithoustontexas.com/",
    airportUrl: "https://www.fly2houston.com/",
    transitUrl: "https://www.ridemetro.org/"
  }),
  createMetro({
    rank: 6,
    slug: "washington-dc",
    name: "Washington DC",
    state: "DC",
    region: "South",
    summary: "The nation's capital pairs iconic monuments and museums with neighborhoods, dining, and riverfronts.",
    tags: ["Monuments", "Museums", "History", "Transit"],
    visitorUrl: "https://washington.org/",
    airportUrl: "https://www.flyreagan.com/",
    transitUrl: "https://www.wmata.com/"
  }),
  createMetro({
    rank: 7,
    slug: "philadelphia",
    name: "Philadelphia",
    state: "PA",
    region: "Northeast",
    summary: "A historic city with landmark sites, energetic neighborhoods, major universities, food halls, and sports.",
    tags: ["History", "Food", "Universities", "Sports"],
    visitorUrl: "https://www.visitphilly.com/",
    airportUrl: "https://www.phl.org/",
    transitUrl: "https://www.septa.org/"
  }),
  createMetro({
    rank: 8,
    slug: "atlanta",
    name: "Atlanta",
    state: "GA",
    region: "South",
    summary: "A major Southern business, film, food, civil rights, music, and airport gateway.",
    tags: ["Music", "Civil Rights", "Film", "Dining"],
    visitorUrl: "https://discoveratlanta.com/",
    airportUrl: "https://www.atl.com/",
    transitUrl: "https://www.itsmarta.com/"
  }),
  createMetro({
    rank: 9,
    slug: "miami",
    name: "Miami",
    state: "FL",
    region: "South",
    summary: "A tropical gateway for beaches, art, nightlife, Latin American culture, cuisine, and cruise travel.",
    tags: ["Beaches", "Nightlife", "Art", "Cruises"],
    visitorUrl: "https://www.miamiandbeaches.com/",
    airportUrl: "https://www.miami-airport.com/",
    transitUrl: "https://www.miamidade.gov/global/transportation/home.page"
  }),
  createMetro({
    rank: 10,
    slug: "phoenix",
    name: "Phoenix",
    state: "AZ",
    region: "West",
    summary: "A desert metro with resorts, golf, hiking, Southwestern food, spring training, and year-round sun.",
    tags: ["Desert", "Resorts", "Golf", "Hiking"],
    visitorUrl: "https://www.visitphoenix.com/",
    airportUrl: "https://www.skyharbor.com/",
    transitUrl: "https://www.valleymetro.org/"
  }),
  createMetro({
    rank: 11,
    slug: "boston",
    name: "Boston",
    state: "MA",
    region: "Northeast",
    summary: "A compact historic metro known for universities, sports, harbor views, seafood, and walkable districts.",
    tags: ["History", "Universities", "Seafood", "Sports"],
    visitorUrl: "https://www.meetboston.com/",
    airportUrl: "https://www.massport.com/logan-airport",
    transitUrl: "https://www.mbta.com/"
  }),
  createMetro({
    rank: 12,
    slug: "san-francisco",
    name: "San Francisco",
    state: "CA",
    region: "West",
    summary: "A Bay Area icon for waterfront views, neighborhoods, technology, food, parks, and cultural landmarks.",
    tags: ["Bay", "Tech", "Food", "Parks"],
    visitorUrl: "https://www.sftravel.com/",
    airportUrl: "https://www.flysfo.com/",
    transitUrl: "https://www.sfmta.com/"
  }),
  createMetro({
    rank: 13,
    slug: "riverside-san-bernardino",
    name: "Riverside-San Bernardino",
    state: "CA",
    region: "West",
    summary: "The Inland Empire connects Southern California logistics, mountains, historic downtowns, shopping, and family attractions.",
    tags: ["Mountains", "Shopping", "Family", "Historic"],
    visitorUrl: "https://www.discoverie.com/",
    airportUrl: "https://www.flyontario.com/",
    transitUrl: "https://www.gosbcta.com/"
  }),
  createMetro({
    rank: 14,
    slug: "detroit",
    name: "Detroit",
    state: "MI",
    region: "Midwest",
    summary: "A Great Lakes comeback city with music heritage, design, sports, riverfront spaces, and automotive history.",
    tags: ["Music", "Design", "Sports", "Riverfront"],
    visitorUrl: "https://visitdetroit.com/",
    airportUrl: "https://www.metroairport.com/",
    transitUrl: "https://www.detroitmi.gov/departments/detroit-department-transportation"
  }),
  createMetro({
    rank: 15,
    slug: "seattle",
    name: "Seattle",
    state: "WA",
    region: "West",
    summary: "A Pacific Northwest hub for coffee, tech, music, seafood, ferries, markets, and mountain views.",
    tags: ["Coffee", "Tech", "Seafood", "Outdoors"],
    visitorUrl: "https://visitseattle.org/",
    airportUrl: "https://www.portseattle.org/sea-tac",
    transitUrl: "https://www.soundtransit.org/"
  }),
  createMetro({
    rank: 16,
    slug: "minneapolis-saint-paul",
    name: "Minneapolis-Saint Paul",
    state: "MN",
    region: "Midwest",
    summary: "Twin Cities culture blends lakes, trails, theater, music, universities, sports, and a strong food scene.",
    tags: ["Lakes", "Theater", "Trails", "Sports"],
    visitorUrl: "https://www.minneapolis.org/",
    airportUrl: "https://www.mspairport.com/",
    transitUrl: "https://www.metrotransit.org/"
  }),
  createMetro({
    rank: 17,
    slug: "san-diego",
    name: "San Diego",
    state: "CA",
    region: "West",
    summary: "A sunny coastal metro with beaches, parks, family attractions, craft beer, tacos, and harbor experiences.",
    tags: ["Beaches", "Family", "Craft Beer", "Parks"],
    visitorUrl: "https://www.sandiego.org/",
    airportUrl: "https://www.san.org/",
    transitUrl: "https://www.sdmts.com/"
  }),
  createMetro({
    rank: 18,
    slug: "tampa-bay",
    name: "Tampa Bay",
    state: "FL",
    region: "South",
    summary: "A Gulf Coast metro for beaches, sports, cruises, Cuban food, museums, and waterfront districts.",
    tags: ["Beaches", "Sports", "Cruises", "Waterfront"],
    visitorUrl: "https://www.visittampabay.com/",
    airportUrl: "https://www.tampaairport.com/",
    transitUrl: "https://www.gohart.org/"
  }),
  createMetro({
    rank: 19,
    slug: "denver",
    name: "Denver",
    state: "CO",
    region: "West",
    summary: "A mountain gateway with craft beer, sports, music venues, parks, museums, and outdoor access.",
    tags: ["Mountains", "Beer", "Sports", "Music"],
    visitorUrl: "https://www.denver.org/",
    airportUrl: "https://www.flydenver.com/",
    transitUrl: "https://www.rtd-denver.com/"
  }),
  createMetro({
    rank: 20,
    slug: "baltimore",
    name: "Baltimore",
    state: "MD",
    region: "South",
    summary: "A harbor city with seafood, neighborhoods, museums, sports, history, and easy Mid-Atlantic access.",
    tags: ["Harbor", "Seafood", "Museums", "Sports"],
    visitorUrl: "https://baltimore.org/",
    airportUrl: "https://www.bwiairport.com/",
    transitUrl: "https://www.mta.maryland.gov/"
  }),
  createMetro({
    rank: 21,
    slug: "st-louis",
    name: "St. Louis",
    state: "MO",
    region: "Midwest",
    summary: "A Mississippi River city with iconic landmarks, blues, sports, parks, family attractions, and barbecue.",
    tags: ["Gateway Arch", "Blues", "Sports", "Parks"],
    visitorUrl: "https://explorestlouis.com/",
    airportUrl: "https://www.flystl.com/",
    transitUrl: "https://www.metrostlouis.org/"
  }),
  createMetro({
    rank: 22,
    slug: "charlotte",
    name: "Charlotte",
    state: "NC",
    region: "South",
    summary: "A growing banking and sports hub with breweries, motorsports, greenways, museums, and Southern food.",
    tags: ["Banking", "Sports", "Breweries", "Motorsports"],
    visitorUrl: "https://www.charlottesgotalot.com/",
    airportUrl: "https://www.cltairport.com/",
    transitUrl: "https://www.charlottenc.gov/CATS"
  }),
  createMetro({
    rank: 23,
    slug: "orlando",
    name: "Orlando",
    state: "FL",
    region: "South",
    summary: "A family travel capital with theme parks, conventions, resorts, dining, shopping, and lakeside neighborhoods.",
    tags: ["Theme Parks", "Family", "Resorts", "Shopping"],
    visitorUrl: "https://www.visitorlando.com/",
    airportUrl: "https://orlandoairports.net/",
    transitUrl: "https://www.golynx.com/"
  }),
  createMetro({
    rank: 24,
    slug: "san-antonio",
    name: "San Antonio",
    state: "TX",
    region: "South",
    summary: "A historic Texas destination with the River Walk, missions, food, family attractions, and military heritage.",
    tags: ["River Walk", "History", "Food", "Family"],
    visitorUrl: "https://www.visitsanantonio.com/",
    airportUrl: "https://flysanantonio.com/",
    transitUrl: "https://www.viainfo.net/"
  }),
  createMetro({
    rank: 25,
    slug: "portland",
    name: "Portland",
    state: "OR",
    region: "West",
    summary: "A Pacific Northwest city for food carts, makers, bookstores, gardens, bikes, beer, and nearby nature.",
    tags: ["Food Carts", "Makers", "Gardens", "Beer"],
    visitorUrl: "https://www.travelportland.com/",
    airportUrl: "https://www.flypdx.com/",
    transitUrl: "https://trimet.org/"
  }),
  createMetro({
    rank: 26,
    slug: "sacramento",
    name: "Sacramento",
    state: "CA",
    region: "West",
    summary: "California's capital offers farm-to-fork dining, riverfront history, politics, sports, and wine country access.",
    tags: ["Capital", "Farm to Fork", "History", "Rivers"],
    visitorUrl: "https://www.visitsacramento.com/",
    airportUrl: "https://sacramento.aero/smf",
    transitUrl: "https://www.sacrt.com/"
  }),
  createMetro({
    rank: 27,
    slug: "pittsburgh",
    name: "Pittsburgh",
    state: "PA",
    region: "Northeast",
    summary: "A river city with universities, sports, museums, bridges, neighborhoods, and a strong tech and food scene.",
    tags: ["Rivers", "Sports", "Universities", "Museums"],
    visitorUrl: "https://www.visitpittsburgh.com/",
    airportUrl: "https://flypittsburgh.com/",
    transitUrl: "https://www.rideprt.org/"
  }),
  createMetro({
    rank: 28,
    slug: "las-vegas",
    name: "Las Vegas",
    state: "NV",
    region: "West",
    summary: "A desert entertainment capital with resorts, shows, dining, sports, nightlife, conventions, and outdoor day trips.",
    tags: ["Entertainment", "Resorts", "Nightlife", "Sports"],
    visitorUrl: "https://www.visitlasvegas.com/",
    airportUrl: "https://www.harryreidairport.com/",
    transitUrl: "https://www.rtcsnv.com/"
  }),
  createMetro({
    rank: 29,
    slug: "austin",
    name: "Austin",
    state: "TX",
    region: "South",
    summary: "A live music and tech city with tacos, festivals, lakes, nightlife, startups, and Hill Country access.",
    tags: ["Music", "Tech", "Tacos", "Festivals"],
    visitorUrl: "https://www.austintexas.org/",
    airportUrl: "https://www.austintexas.gov/airport",
    transitUrl: "https://www.capmetro.org/"
  }),
  createMetro({
    rank: 30,
    slug: "cincinnati",
    name: "Cincinnati",
    state: "OH",
    region: "Midwest",
    summary: "An Ohio River metro with historic neighborhoods, arts, sports, breweries, family attractions, and chili culture.",
    tags: ["Riverfront", "Arts", "Sports", "Breweries"],
    visitorUrl: "https://www.visitcincy.com/",
    airportUrl: "https://www.cvgairport.com/",
    transitUrl: "https://www.go-metro.com/"
  }),
  createMetro({
    rank: 31,
    slug: "kansas-city",
    name: "Kansas City",
    state: "MO",
    region: "Midwest",
    summary: "A central U.S. metro known for barbecue, jazz, fountains, sports, museums, and walkable districts.",
    tags: ["Barbecue", "Jazz", "Sports", "Museums"],
    visitorUrl: "https://www.visitkc.com/",
    airportUrl: "https://flykc.com/",
    transitUrl: "https://ridekc.org/"
  }),
  createMetro({
    rank: 32,
    slug: "columbus",
    name: "Columbus",
    state: "OH",
    region: "Midwest",
    summary: "Ohio's capital blends university energy, food halls, sports, fashion, neighborhoods, and family attractions.",
    tags: ["Capital", "University", "Food", "Sports"],
    visitorUrl: "https://www.experiencecolumbus.com/",
    airportUrl: "https://flycolumbus.com/",
    transitUrl: "https://www.cota.com/"
  }),
  createMetro({
    rank: 33,
    slug: "indianapolis",
    name: "Indianapolis",
    state: "IN",
    region: "Midwest",
    summary: "A sports and convention city with racing heritage, museums, trails, neighborhoods, and family-friendly stops.",
    tags: ["Racing", "Sports", "Museums", "Trails"],
    visitorUrl: "https://www.visitindy.com/",
    airportUrl: "https://www.ind.com/",
    transitUrl: "https://www.indygo.net/"
  }),
  createMetro({
    rank: 34,
    slug: "cleveland",
    name: "Cleveland",
    state: "OH",
    region: "Midwest",
    summary: "A Lake Erie metro with music history, sports, museums, health care, neighborhoods, and waterfront parks.",
    tags: ["Music", "Lakefront", "Sports", "Museums"],
    visitorUrl: "https://www.thisiscleveland.com/",
    airportUrl: "https://www.clevelandairport.com/",
    transitUrl: "https://www.riderta.com/"
  }),
  createMetro({
    rank: 35,
    slug: "san-jose",
    name: "San Jose",
    state: "CA",
    region: "West",
    summary: "Silicon Valley's largest city offers tech culture, food, museums, shopping, gardens, and Bay Area access.",
    tags: ["Tech", "Museums", "Shopping", "Gardens"],
    visitorUrl: "https://www.sanjose.org/",
    airportUrl: "https://www.flysanjose.com/",
    transitUrl: "https://www.vta.org/"
  }),
  createMetro({
    rank: 36,
    slug: "nashville",
    name: "Nashville",
    state: "TN",
    region: "South",
    summary: "Music City brings honky-tonks, recording history, food, sports, universities, and a booming events calendar.",
    tags: ["Music", "Nightlife", "Food", "Sports"],
    visitorUrl: "https://www.visitmusiccity.com/",
    airportUrl: "https://flynashville.com/",
    transitUrl: "https://www.wegotransit.com/"
  }),
  createMetro({
    rank: 37,
    slug: "virginia-beach",
    name: "Virginia Beach",
    state: "VA",
    region: "South",
    summary: "A coastal Hampton Roads anchor with beaches, naval history, family attractions, seafood, and outdoor recreation.",
    tags: ["Beaches", "Seafood", "Military", "Family"],
    visitorUrl: "https://www.visitvirginiabeach.com/",
    airportUrl: "https://www.norfolkairport.com/",
    transitUrl: "https://gohrt.com/"
  }),
  createMetro({
    rank: 38,
    slug: "providence",
    name: "Providence",
    state: "RI",
    region: "Northeast",
    summary: "A compact New England metro with colleges, design, dining, rivers, historic streets, and coastal day trips.",
    tags: ["Design", "Dining", "Colleges", "History"],
    visitorUrl: "https://www.goprovidence.com/",
    airportUrl: "https://flyri.com/",
    transitUrl: "https://www.ripta.com/"
  }),
  createMetro({
    rank: 39,
    slug: "milwaukee",
    name: "Milwaukee",
    state: "WI",
    region: "Midwest",
    summary: "A Lake Michigan city with breweries, festivals, motorcycles, sports, museums, and lakefront neighborhoods.",
    tags: ["Breweries", "Festivals", "Lakefront", "Sports"],
    visitorUrl: "https://www.visitmilwaukee.org/",
    airportUrl: "https://www.mitchellairport.com/",
    transitUrl: "https://www.ridemcts.com/"
  }),
  createMetro({
    rank: 40,
    slug: "jacksonville",
    name: "Jacksonville",
    state: "FL",
    region: "South",
    summary: "A large North Florida city with beaches, rivers, parks, sports, neighborhoods, and coastal dining.",
    tags: ["Beaches", "Rivers", "Parks", "Sports"],
    visitorUrl: "https://www.visitjacksonville.com/",
    airportUrl: "https://www.flyjacksonville.com/",
    transitUrl: "https://www.jtafla.com/"
  }),
  createMetro({
    rank: 41,
    slug: "oklahoma-city",
    name: "Oklahoma City",
    state: "OK",
    region: "South",
    summary: "A Plains capital with western heritage, museums, riverfront recreation, sports, districts, and family attractions.",
    tags: ["Western", "Capital", "Sports", "Museums"],
    visitorUrl: "https://www.visitokc.com/",
    airportUrl: "https://www.flyokc.com/",
    transitUrl: "https://www.embarkok.com/"
  }),
  createMetro({
    rank: 42,
    slug: "raleigh-durham",
    name: "Raleigh-Durham",
    state: "NC",
    region: "South",
    summary: "The Research Triangle mixes universities, tech, museums, parks, food halls, music, and family-friendly neighborhoods.",
    tags: ["Universities", "Tech", "Museums", "Parks"],
    visitorUrl: "https://www.visitraleigh.com/",
    airportUrl: "https://www.rdu.com/",
    transitUrl: "https://gotriangle.org/"
  }),
  createMetro({
    rank: 43,
    slug: "memphis",
    name: "Memphis",
    state: "TN",
    region: "South",
    summary: "A Mississippi River music city with blues, soul, barbecue, civil rights landmarks, sports, and nightlife.",
    tags: ["Music", "Barbecue", "Civil Rights", "Riverfront"],
    visitorUrl: "https://www.memphistravel.com/",
    airportUrl: "https://flymemphis.com/",
    transitUrl: "https://www.matatransit.com/"
  }),
  createMetro({
    rank: 44,
    slug: "richmond",
    name: "Richmond",
    state: "VA",
    region: "South",
    summary: "Virginia's capital offers history, river recreation, museums, breweries, food, neighborhoods, and arts.",
    tags: ["Capital", "History", "River", "Breweries"],
    visitorUrl: "https://www.visitrichmondva.com/",
    airportUrl: "https://flyrichmond.com/",
    transitUrl: "https://ridegrtc.com/"
  }),
  createMetro({
    rank: 45,
    slug: "new-orleans",
    name: "New Orleans",
    state: "LA",
    region: "South",
    summary: "A singular Gulf Coast city for music, food, festivals, history, nightlife, architecture, and river culture.",
    tags: ["Music", "Food", "Festivals", "Nightlife"],
    visitorUrl: "https://www.neworleans.com/",
    airportUrl: "https://flymsy.com/",
    transitUrl: "https://www.norta.com/"
  }),
  createMetro({
    rank: 46,
    slug: "louisville",
    name: "Louisville",
    state: "KY",
    region: "South",
    summary: "A river city known for bourbon, horse racing, food, museums, parks, and historic neighborhoods.",
    tags: ["Bourbon", "Racing", "Food", "Riverfront"],
    visitorUrl: "https://www.gotolouisville.com/",
    airportUrl: "https://www.flylouisville.com/",
    transitUrl: "https://www.ridetarc.org/"
  }),
  createMetro({
    rank: 47,
    slug: "salt-lake-city",
    name: "Salt Lake City",
    state: "UT",
    region: "West",
    summary: "A mountain metro with skiing access, outdoor culture, downtown events, temples, breweries, and family attractions.",
    tags: ["Mountains", "Skiing", "Outdoors", "Downtown"],
    visitorUrl: "https://www.visitsaltlake.com/",
    airportUrl: "https://slcairport.com/",
    transitUrl: "https://www.rideuta.com/"
  }),
  createMetro({
    rank: 48,
    slug: "hartford",
    name: "Hartford",
    state: "CT",
    region: "Northeast",
    summary: "Connecticut's capital region offers history, insurance and university anchors, riverfronts, museums, and New England access.",
    tags: ["Capital", "History", "Museums", "Riverfront"],
    visitorUrl: "https://ctvisit.com/",
    airportUrl: "https://bradleyairport.com/",
    transitUrl: "https://www.cttransit.com/"
  }),
  createMetro({
    rank: 49,
    slug: "buffalo",
    name: "Buffalo",
    state: "NY",
    region: "Northeast",
    summary: "A Great Lakes city near Niagara Falls with architecture, wings, sports, waterfront spaces, and revitalized districts.",
    tags: ["Architecture", "Wings", "Sports", "Waterfront"],
    visitorUrl: "https://www.visitbuffaloniagara.com/",
    airportUrl: "https://www.buffaloairport.com/",
    transitUrl: "https://metro.nfta.com/"
  }),
  createMetro({
    rank: 50,
    slug: "birmingham",
    name: "Birmingham",
    state: "AL",
    region: "South",
    summary: "An Alabama metro with civil rights history, barbecue, breweries, parks, sports, and a growing food scene.",
    tags: ["Civil Rights", "Food", "Parks", "Breweries"],
    visitorUrl: "https://www.birminghamal.org/",
    airportUrl: "https://www.flybirmingham.com/",
    transitUrl: "https://maxtransit.org/"
  })
];

const AVERYSPOT_DATA = { CATEGORIES, METROS, makeMapLink, makeYoutubeLink, makeTravelLink };
if (typeof window !== "undefined") window.AVERYSPOT_DATA = AVERYSPOT_DATA;
if (typeof module !== "undefined") module.exports = AVERYSPOT_DATA;
