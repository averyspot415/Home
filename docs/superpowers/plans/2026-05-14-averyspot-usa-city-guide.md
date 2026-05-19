# AverySpot USA City Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished static city-discovery website for the top 50 U.S. metros with durable official links and useful action links.

**Architecture:** Use a lightweight static app with one homepage and one reusable city route. Store the 50-metro content in structured JavaScript data, render homepage and city pages from shared helper functions, and verify link/page integrity with a Node script.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js for local verification scripts.

---

## File Structure

- Create `index.html`: homepage shell, semantic sections, script includes.
- Create `city.html`: reusable city-page shell that reads `?metro=<slug>`.
- Create `styles.css`: responsive layout, cards, filters, city pages, link panels.
- Create `data.js`: top 50 metro dataset, category metadata, link-building helpers, and exports on `window.AVERYSPOT_DATA`.
- Create `app.js`: homepage rendering, city-page rendering, search/filter behavior, link-card helpers, and missing-city handling.
- Create `verify.js`: Node checks that all 50 metro links exist, city/action links have nonempty URLs, and required files are present.
- Modify `.gitignore`: keep `.superpowers/` ignored.

## Task 1: Static Shells

**Files:**
- Create: `index.html`
- Create: `city.html`

- [ ] **Step 1: Create the homepage shell**

Create `index.html` with:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AverySpot USA | City-by-city local guide</title>
  <meta name="description" content="Explore the top U.S. metros city by city with official visitor links, maps, hotels, restaurants, events, shopping, sports, nightlife, wellness, and video discovery.">
  <link rel="stylesheet" href="styles.css">
</head>
<body data-page="home">
  <header class="site-header">
    <a class="brand" href="index.html" aria-label="AverySpot USA home">
      <span class="brand-mark">AS</span>
      <span><strong>AverySpot</strong><small>USA</small></span>
    </a>
    <nav class="top-nav" aria-label="Primary navigation">
      <a href="#cities">Cities</a>
      <a href="#categories">Categories</a>
      <a href="#plan">Plan</a>
      <a href="#advertise">Advertise</a>
    </nav>
  </header>
  <main>
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">Top 50 U.S. metros</p>
        <h1>Find the best of every major American city.</h1>
        <p class="hero-text">Official city resources, durable local links, useful booking actions, video discovery, and category-by-category guidance in one fast national directory.</p>
        <div class="hero-actions">
          <a class="button primary" href="#cities">Explore cities</a>
          <a class="button secondary" href="#categories">Browse categories</a>
        </div>
      </div>
      <div class="hero-panel" id="heroPanel"></div>
    </section>
    <section id="plan" class="section action-strip" aria-labelledby="planTitle">
      <div>
        <p class="eyebrow">Plan fast</p>
        <h2 id="planTitle">Choose a city, then jump straight to the thing you need.</h2>
      </div>
      <div id="quickActions" class="quick-actions"></div>
    </section>
    <section id="categories" class="section" aria-labelledby="categoriesTitle">
      <div class="section-heading">
        <p class="eyebrow">Categories</p>
        <h2 id="categoriesTitle">A richer local marketplace.</h2>
      </div>
      <div id="categoryGrid" class="category-grid"></div>
    </section>
    <section id="cities" class="section" aria-labelledby="citiesTitle">
      <div class="section-heading split-heading">
        <div>
          <p class="eyebrow">City index</p>
          <h2 id="citiesTitle">Top 50 metros, city by city.</h2>
        </div>
        <div class="filters">
          <input id="citySearch" type="search" placeholder="Search city, state, or region" aria-label="Search cities">
          <select id="regionFilter" aria-label="Filter by region">
            <option value="all">All regions</option>
          </select>
        </div>
      </div>
      <div id="cityGrid" class="city-grid"></div>
      <p id="emptyState" class="empty-state" hidden>No cities found. Try another search.</p>
    </section>
    <section id="advertise" class="section advertise-band" aria-labelledby="advertiseTitle">
      <div>
        <p class="eyebrow">Local media</p>
        <h2 id="advertiseTitle">Built for discovery, booking, and city-by-city advertising.</h2>
        <p>Inspired by AverySpot's digital signage idea, this version gives each metro a cleaner place for visitor resources, local brands, event links, and action-oriented category discovery.</p>
      </div>
      <a class="button primary" href="mailto:Info@averyspot.com">Contact AverySpot</a>
    </section>
  </main>
  <footer class="site-footer">
    <p>&copy; 2026 AverySpot USA. Independent city-discovery concept.</p>
    <a href="mailto:Info@averyspot.com">Info@averyspot.com</a>
  </footer>
  <script src="data.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create the reusable city route**

Create `city.html` with:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AverySpot USA City Guide</title>
  <meta name="description" content="A city-by-city guide with official links, maps, hotels, food, shopping, nightlife, sports, wellness, events, and video discovery.">
  <link rel="stylesheet" href="styles.css">
</head>
<body data-page="city">
  <header class="site-header">
    <a class="brand" href="index.html" aria-label="AverySpot USA home">
      <span class="brand-mark">AS</span>
      <span><strong>AverySpot</strong><small>USA</small></span>
    </a>
    <nav class="top-nav" aria-label="Primary navigation">
      <a href="index.html#cities">Cities</a>
      <a href="#official">Official</a>
      <a href="#food">Food</a>
      <a href="#videos">Videos</a>
    </nav>
  </header>
  <main id="cityPage"></main>
  <footer class="site-footer">
    <p>&copy; 2026 AverySpot USA. City links open in a new tab.</p>
    <a href="index.html#cities">Back to city index</a>
  </footer>
  <script src="data.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

- [ ] **Step 3: Verify shells load as static files**

Run: `Get-ChildItem index.html, city.html`

Expected: both files are listed.

## Task 2: Data Model and Top 50 Metro Dataset

**Files:**
- Create: `data.js`

- [ ] **Step 1: Create categories and URL helpers**

Create `data.js` with `CATEGORIES`, `makeMapLink`, `makeYoutubeLink`, and `makeTravelLink`.

```javascript
const CATEGORIES = [
  { id: "official", label: "Official", summary: "Visitor bureaus, city info, airports, and transit." },
  { id: "hotels", label: "Hotels", summary: "Hotel searches and official visitor lodging resources." },
  { id: "food", label: "Food", summary: "Restaurants, reservations, food halls, and local dining searches." },
  { id: "shopping", label: "Shopping", summary: "Shopping districts, malls, outlets, boutiques, and marketplace searches." },
  { id: "nightlife", label: "Nightlife", summary: "Music, clubs, lounges, bars, comedy, and late-night plans." },
  { id: "sports", label: "Sports", summary: "Teams, arenas, stadiums, tickets, and game-day searches." },
  { id: "events", label: "Events", summary: "Concerts, festivals, shows, weddings, and local calendars." },
  { id: "wellness", label: "Beauty & wellness", summary: "Spas, salons, grooming, fitness, massage, and self-care." },
  { id: "family", label: "Family", summary: "Museums, parks, attractions, tours, and family-friendly ideas." },
  { id: "videos", label: "Videos", summary: "Durable video search links for tours, food, hotels, and attractions." }
];

function encodeQuery(value) {
  return encodeURIComponent(value);
}

function makeMapLink(city, query) {
  return `https://www.google.com/maps/search/${encodeQuery(`${query} in ${city}`)}`;
}

function makeYoutubeLink(city, query) {
  return `https://www.youtube.com/results?search_query=${encodeQuery(`${city} ${query}`)}`;
}

function makeTravelLink(city, type) {
  return `https://www.google.com/travel/${type}?q=${encodeQuery(city)}`;
}
```

- [ ] **Step 2: Add `createMetro` helper**

Append:

```javascript
function createMetro(config) {
  const city = `${config.name}, ${config.state}`;
  const baseLinks = {
    official: [
      { label: "Official visitor guide", url: config.visitorUrl, type: "Official" },
      { label: "Airport information", url: config.airportUrl, type: "Official" },
      { label: "Public transit", url: config.transitUrl, type: "Official" }
    ],
    hotels: [
      { label: "Hotels near this city", url: makeTravelLink(city, "hotels"), type: "Search" },
      { label: "Hotel map search", url: makeMapLink(city, "hotels"), type: "Maps" }
    ],
    food: [
      { label: "Restaurants map", url: makeMapLink(city, "best restaurants"), type: "Maps" },
      { label: "OpenTable restaurants", url: `https://www.opentable.com/s?term=${encodeQuery(city)}`, type: "Reservations" }
    ],
    shopping: [
      { label: "Shopping map", url: makeMapLink(city, "shopping"), type: "Maps" },
      { label: "Malls and outlets", url: makeMapLink(city, "malls outlets shopping districts"), type: "Maps" }
    ],
    nightlife: [
      { label: "Nightlife map", url: makeMapLink(city, "nightlife bars clubs live music"), type: "Maps" },
      { label: "Live music", url: makeMapLink(city, "live music"), type: "Maps" }
    ],
    sports: [
      { label: "Sports venues", url: makeMapLink(city, "stadiums arenas sports venues"), type: "Maps" },
      { label: "Tickets", url: `https://www.ticketmaster.com/search?q=${encodeQuery(city)}`, type: "Tickets" }
    ],
    events: [
      { label: "Event tickets", url: `https://www.ticketmaster.com/search?q=${encodeQuery(city)}`, type: "Tickets" },
      { label: "Wedding venues", url: makeMapLink(city, "wedding venues"), type: "Maps" }
    ],
    wellness: [
      { label: "Spas and massage", url: makeMapLink(city, "spas massage wellness"), type: "Maps" },
      { label: "Salons and grooming", url: makeMapLink(city, "hair salons barbers nail salons"), type: "Maps" }
    ],
    family: [
      { label: "Museums and attractions", url: makeMapLink(city, "museums attractions family activities"), type: "Maps" },
      { label: "Parks and gardens", url: makeMapLink(city, "parks gardens"), type: "Maps" }
    ],
    videos: [
      { label: "City travel guide videos", url: makeYoutubeLink(city, "travel guide"), type: "YouTube" },
      { label: "Food tour videos", url: makeYoutubeLink(city, "food tour"), type: "YouTube" },
      { label: "Hotel and neighborhood tours", url: makeYoutubeLink(city, "hotel neighborhood tour"), type: "YouTube" }
    ]
  };

  return { ...config, links: baseLinks };
}
```

- [ ] **Step 3: Add the top 50 metros**

Add a `METROS` array with 50 calls to `createMetro`. Use official visitor, airport, and transit URLs for each entry. Include at least:

```javascript
const METROS = [
  createMetro({ rank: 1, slug: "new-york", name: "New York", state: "NY", region: "Northeast", summary: "The country's largest city hub for culture, finance, food, shopping, sports, and global travel.", tags: ["Global", "Arts", "Food"], visitorUrl: "https://www.nyctourism.com/", airportUrl: "https://www.panynj.gov/airports/en/index.html", transitUrl: "https://new.mta.info/" }),
  createMetro({ rank: 2, slug: "los-angeles", name: "Los Angeles", state: "CA", region: "West", summary: "A sprawling entertainment capital with beaches, studios, food neighborhoods, shopping, nightlife, and sports.", tags: ["Entertainment", "Beaches", "Food"], visitorUrl: "https://www.discoverlosangeles.com/", airportUrl: "https://www.flylax.com/", transitUrl: "https://www.metro.net/" }),
  createMetro({ rank: 3, slug: "chicago", name: "Chicago", state: "IL", region: "Midwest", summary: "Lakefront architecture, iconic food, museums, comedy, shopping, transit, and major-league sports.", tags: ["Architecture", "Lakefront", "Sports"], visitorUrl: "https://www.choosechicago.com/", airportUrl: "https://www.flychicago.com/", transitUrl: "https://www.transitchicago.com/" })
];
```

Then fill out the remaining 47 metros in rank order using the same object shape.

- [ ] **Step 4: Export data globally**

Append:

```javascript
window.AVERYSPOT_DATA = {
  CATEGORIES,
  METROS,
  makeMapLink,
  makeYoutubeLink,
  makeTravelLink
};
```

- [ ] **Step 5: Verify there are 50 metros**

Run: `node -e "require('./data.js'); console.log(global.window ? 'browser-only' : 'loaded')"`

Expected: Node may fail because `window` is not defined. If so, update the export to guard Node:

```javascript
const AVERYSPOT_DATA = { CATEGORIES, METROS, makeMapLink, makeYoutubeLink, makeTravelLink };
if (typeof window !== "undefined") window.AVERYSPOT_DATA = AVERYSPOT_DATA;
if (typeof module !== "undefined") module.exports = AVERYSPOT_DATA;
```

Run: `node -e "const d=require('./data.js'); console.log(d.METROS.length)"`

Expected: `50`.

## Task 3: Rendering and Interactions

**Files:**
- Create: `app.js`

- [ ] **Step 1: Add shared DOM helpers**

Create `app.js` with:

```javascript
const { CATEGORIES, METROS } = window.AVERYSPOT_DATA;

function externalAttrs() {
  return 'target="_blank" rel="noopener"';
}

function linkCard(link) {
  return `<a class="link-card" href="${link.url}" ${externalAttrs()}>
    <span class="link-type">${link.type}</span>
    <strong>${link.label}</strong>
    <span class="link-url">${new URL(link.url).hostname.replace("www.", "")}</span>
  </a>`;
}

function metroUrl(slug) {
  return `city.html?metro=${encodeURIComponent(slug)}`;
}

function getMetroFromUrl() {
  return new URLSearchParams(window.location.search).get("metro");
}
```

- [ ] **Step 2: Render homepage**

Add `renderHome()` to populate hero panel, quick actions, categories, region filter, and city cards. City card links must point to `city.html?metro=<slug>`.

```javascript
function renderHome() {
  const heroPanel = document.querySelector("#heroPanel");
  const quickActions = document.querySelector("#quickActions");
  const categoryGrid = document.querySelector("#categoryGrid");
  const cityGrid = document.querySelector("#cityGrid");
  const regionFilter = document.querySelector("#regionFilter");

  heroPanel.innerHTML = METROS.slice(0, 5).map((metro) => `
    <a class="hero-city" href="${metroUrl(metro.slug)}">
      <span>#${metro.rank}</span>
      <strong>${metro.name}</strong>
      <small>${metro.region}</small>
    </a>
  `).join("");

  quickActions.innerHTML = ["hotels", "food", "events", "shopping", "wellness"].map((id) => {
    const category = CATEGORIES.find((item) => item.id === id);
    return `<a href="#cities" class="quick-action" data-category="${id}">${category.label}</a>`;
  }).join("");

  categoryGrid.innerHTML = CATEGORIES.map((category) => `
    <article class="category-card">
      <span>${category.id}</span>
      <h3>${category.label}</h3>
      <p>${category.summary}</p>
    </article>
  `).join("");

  [...new Set(METROS.map((metro) => metro.region))].sort().forEach((region) => {
    regionFilter.insertAdjacentHTML("beforeend", `<option value="${region}">${region}</option>`);
  });

  function drawCities() {
    const query = document.querySelector("#citySearch").value.trim().toLowerCase();
    const region = regionFilter.value;
    const filtered = METROS.filter((metro) => {
      const haystack = `${metro.name} ${metro.state} ${metro.region} ${metro.tags.join(" ")}`.toLowerCase();
      return haystack.includes(query) && (region === "all" || metro.region === region);
    });
    cityGrid.innerHTML = filtered.map((metro) => `
      <article class="city-card">
        <div>
          <span class="rank">#${metro.rank}</span>
          <h3>${metro.name}</h3>
          <p>${metro.summary}</p>
        </div>
        <div class="tag-row">${metro.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        <a class="button secondary" href="${metroUrl(metro.slug)}">Open city guide</a>
      </article>
    `).join("");
    document.querySelector("#emptyState").hidden = filtered.length > 0;
  }

  document.querySelector("#citySearch").addEventListener("input", drawCities);
  regionFilter.addEventListener("change", drawCities);
  drawCities();
}
```

- [ ] **Step 3: Render city page**

Add `renderCity()` that finds the metro by URL slug, renders missing-city state if absent, and renders link panels for every category.

```javascript
function renderCity() {
  const slug = getMetroFromUrl();
  const metro = METROS.find((item) => item.slug === slug);
  const root = document.querySelector("#cityPage");

  if (!metro) {
    document.title = "City not found | AverySpot USA";
    root.innerHTML = `<section class="section missing-city">
      <p class="eyebrow">City not found</p>
      <h1>We could not find that metro guide.</h1>
      <p>Return to the city index and choose one of the top 50 U.S. metros.</p>
      <a class="button primary" href="index.html#cities">Back to cities</a>
    </section>`;
    return;
  }

  document.title = `${metro.name}, ${metro.state} | AverySpot USA`;
  root.innerHTML = `
    <section class="city-hero">
      <div>
        <a class="back-link" href="index.html#cities">Back to all cities</a>
        <p class="eyebrow">#${metro.rank} metro guide</p>
        <h1>${metro.name}, ${metro.state}</h1>
        <p>${metro.summary}</p>
        <div class="tag-row">${metro.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
      </div>
      <div class="city-actions">
        ${linkCard(metro.links.official[0])}
        ${linkCard(metro.links.hotels[0])}
        ${linkCard(metro.links.food[0])}
      </div>
    </section>
    <section class="section city-sections">
      ${CATEGORIES.map((category) => `
        <article class="link-section" id="${category.id}">
          <div class="link-section-heading">
            <span class="eyebrow">${category.id}</span>
            <h2>${category.label}</h2>
            <p>${category.summary}</p>
          </div>
          <div class="link-grid">${metro.links[category.id].map(linkCard).join("")}</div>
        </article>
      `).join("")}
    </section>
  `;
}
```

- [ ] **Step 4: Wire page boot**

Append:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "home") renderHome();
  if (page === "city") renderCity();
});
```

## Task 4: Visual System

**Files:**
- Create: `styles.css`

- [ ] **Step 1: Add base layout and typography**

Create `styles.css` with CSS variables, reset, header, buttons, hero, sections, and footer.

- [ ] **Step 2: Add cards, filters, and city route styles**

Add CSS for `.hero-panel`, `.hero-city`, `.action-strip`, `.quick-actions`, `.category-grid`, `.city-grid`, `.city-card`, `.filters`, `.city-hero`, `.city-actions`, `.link-section`, `.link-grid`, and `.link-card`.

- [ ] **Step 3: Add responsive rules**

Add media queries for `max-width: 760px` so navigation wraps, hero becomes one column, filters stack, city cards remain readable, and link cards do not overflow.

- [ ] **Step 4: Run a visual smoke check**

Open `index.html` in a browser or run a local server and inspect desktop and mobile widths.

Expected: no overlapping text, no blank panels, and all primary controls fit.

## Task 5: Verification Script

**Files:**
- Create: `verify.js`

- [ ] **Step 1: Create verification script**

Create `verify.js`:

```javascript
const fs = require("fs");
const { CATEGORIES, METROS } = require("./data.js");

const requiredFiles = ["index.html", "city.html", "styles.css", "data.js", "app.js"];
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) throw new Error(`Missing required file: ${file}`);
}

if (METROS.length !== 50) throw new Error(`Expected 50 metros, found ${METROS.length}`);

const slugs = new Set();
for (const metro of METROS) {
  if (!metro.slug || slugs.has(metro.slug)) throw new Error(`Invalid or duplicate slug: ${metro.slug}`);
  slugs.add(metro.slug);
  for (const category of CATEGORIES) {
    const links = metro.links[category.id];
    if (!Array.isArray(links) || links.length === 0) {
      throw new Error(`${metro.name} missing links for ${category.id}`);
    }
    for (const link of links) {
      if (!link.label || !link.url || !/^https?:\/\//.test(link.url)) {
        throw new Error(`${metro.name} has invalid link in ${category.id}: ${JSON.stringify(link)}`);
      }
    }
  }
}

const indexHtml = fs.readFileSync("index.html", "utf8");
const cityHtml = fs.readFileSync("city.html", "utf8");
for (const fileText of [indexHtml, cityHtml]) {
  if (fileText.includes('href="#"')) throw new Error("Found placeholder href");
}

console.log(`Verified ${METROS.length} metros across ${CATEGORIES.length} categories.`);
```

- [ ] **Step 2: Run verification**

Run: `node verify.js`

Expected: `Verified 50 metros across 10 categories.`

## Task 6: Browser Verification and Final Polish

**Files:**
- Modify as needed: `index.html`, `city.html`, `styles.css`, `data.js`, `app.js`, `verify.js`

- [ ] **Step 1: Start a local server**

Run: `python -m http.server 8000`

If Python is unavailable, use: `npx serve .`

- [ ] **Step 2: Open homepage**

Open: `http://localhost:8000/index.html`

Expected: homepage renders, city grid has 50 cards, search works, region filter works.

- [ ] **Step 3: Open sample city page**

Open: `http://localhost:8000/city.html?metro=las-vegas`

Expected: city hero and all 10 category sections render with external links.

- [ ] **Step 4: Check missing city**

Open: `http://localhost:8000/city.html?metro=missing`

Expected: friendly missing-city message and working back link.

- [ ] **Step 5: Run final verification**

Run: `node verify.js`

Expected: `Verified 50 metros across 10 categories.`

## Self-Review

- Spec coverage: homepage, top 50 metros, reusable city route, official/action links, categories, browser verification, and link verification are covered.
- Placeholder scan: no `TBD` or `TODO` requirements remain. The plan includes explicit file responsibilities and concrete verification commands.
- Type consistency: `CATEGORIES`, `METROS`, `createMetro`, `linkCard`, and route slug names are used consistently across tasks.
