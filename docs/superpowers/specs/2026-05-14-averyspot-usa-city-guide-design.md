# AverySpot USA City Guide Design

## Goal

Create a substantially upgraded AverySpot-style website for the top 50 U.S. metropolitan areas. The site should work as a city-by-city discovery and action hub: users can choose a metro, scan major local categories, and follow live links to official resources, maps, booking, tickets, videos, and marketplace destinations.

## Reference Site Findings

The reference site at `https://www.averyspot.com/` is a Wix-based Las Vegas marketplace and discovery site. Its visible structure includes:

- A broad category menu covering marketplace, beauty, food, shopping, fitness, pools and spas, clubs, weddings, sports, vehicles, electronics, pharmacy, casinos, furniture, grocery, patio and garden, and advertising products.
- A Las Vegas-focused hero: "Welcome to Fabulous Las Vegas" and digital signage messaging.
- Embedded video sections for hotels, food/restaurants, shopping, shows, pools/spas, nightlife, sports, weddings, gaming/casinos, cannabis, and strip clubs.
- Contact and advertising links, including `Info@averyspot.com`.

The new site should preserve the useful idea, which is a local discovery hub, while improving information architecture, content depth, visual polish, scalability, and link quality.

## Chosen Direction

Use the Hybrid Command Center direction.

The homepage and city pages should feel like a practical city command center: useful like a directory, rich like a travel guide, and focused on helping the user decide and act quickly. The site should not be a marketing landing page. The first screen should immediately expose search, city selection, featured metro content, and category actions.

## Scope

Build a static website covering the top 50 U.S. metropolitan areas.

Each metro should have a generated city page with:

- City snapshot and short positioning copy.
- Official visitor or convention bureau links.
- City government or official local information links when useful.
- Airport and transit links.
- Hotels and stays.
- Restaurants and food.
- Shopping.
- Nightlife and entertainment.
- Sports and arenas.
- Weddings and events.
- Beauty, wellness, spas, salons, and grooming.
- Family activities and attractions.
- Marketplace/action links such as maps, reservations, tickets, booking, and local searches.
- Video discovery links, using YouTube search URLs or curated durable video-search links rather than fragile embedded video IDs where possible.

The initial top-50 metro set should be represented as structured data, not hardcoded page markup. City pages should be rendered from a shared template.

## Link Strategy

The user selected a mixed link strategy with official links as the backbone.

Use durable official links first:

- Official tourism and visitor bureau sites.
- Airport sites.
- Public transit agencies.
- City or regional government resources.
- Official sports team, arena, and venue sites.

Use commercial links where they help users take action:

- Google Maps category searches for local discovery.
- OpenTable or Resy restaurant searches where appropriate.
- Ticketmaster, SeatGeek, or official box office links for events.
- Major hotel/travel search destinations.
- Shopping district, mall, or marketplace searches.

Every visible link should have an `href`. Placeholder `#` links should be avoided except for in-page UI controls.

## Information Architecture

Homepage:

- Sticky header with brand, city index, categories, videos, and advertise/contact.
- Search and filter area for metro, state, and category.
- Featured metro cards.
- Top category launcher.
- "Plan fast" action panel with hotels, restaurants, events, transportation, and maps.
- National city grid for all 50 metros.
- Advertising/product section inspired by the reference site's digital signage and ad-products section.

City page:

- Metro hero with city identity, state, quick tags, and action buttons.
- Snapshot metrics or plain-language highlights.
- Link panels grouped by official resources, transportation, stay, eat, play, shop, nightlife, sports, wellness, and local services.
- "Watch the city" panel for video discovery.
- Neighborhood and day-plan ideas where data is available.
- Related cities or nearby metros.

Category pages or filtered views:

- The first implementation can use homepage/category filters and city-page category sections rather than separate static category pages for every city-category combination.
- Category anchors should be stable so links like `city.html#food` work.

## Data Model

Use a single structured JavaScript data file containing:

- Metro id and slug.
- Display name.
- State or multi-state region.
- Region.
- Short summary.
- Tags.
- Hero image or generated visual treatment metadata.
- Official links.
- Action links grouped by category.
- Sports teams or notable venues when relevant.
- Neighborhoods or signature areas.
- Video search links.

Use helper functions to generate:

- Homepage metro cards.
- Search/filter results.
- City page sections.
- Link cards.
- Related-city suggestions.

This keeps the site maintainable and makes it easy to add or revise metros.

## Visual Design

The look should be premium, urban, and practical:

- Strong first viewport with brand signal and city-search utility.
- Dense but readable cards with restrained borders and clear hierarchy.
- Mixed palette that does not collapse into a single hue theme.
- Real city names and category labels throughout, no lorem ipsum.
- Responsive layouts for desktop and mobile.
- Stable dimensions for city cards, link cards, filter controls, and hero actions.

Avoid:

- Generic marketing hero copy.
- Decorative gradient blobs or one-note color palettes.
- Card-inside-card layouts.
- Placeholder links or nonfunctional nav items.
- Giant text in compact panels.

## Implementation Shape

Because the workspace is empty, build a lightweight static app:

- `index.html`
- `styles.css`
- `data.js`
- `app.js`
- Generated or template-driven city pages, either as static route files or one `city.html?metro=slug` route.

Preference: use a single `city.html?metro=slug` route for speed and maintainability, while exposing every metro from the homepage with live links. This keeps the first version compact and avoids manually maintaining 50 separate HTML files.

If the user later wants SEO-friendly individual files, add a build step that emits `/cities/<slug>.html` from the same data.

## Error Handling

- If a city slug is missing, show a friendly "city not found" state with a link back to the city index.
- If a category has no city-specific links, fall back to durable Google Maps search links for that city and category.
- External links should open in a new tab with `rel="noopener"`.
- Search and filters should gracefully show "no cities found" instead of an empty grid.

## Verification

Before completion:

- Open the local site in a browser.
- Confirm homepage renders.
- Confirm a sample city page renders.
- Confirm search/filter interactions work.
- Confirm all 50 metro links have nonempty `href` values.
- Confirm category/action links have live external URLs.
- Check mobile and desktop layouts for overlap or unreadable text.
- Run any available static checks or simple scripted link-presence checks.

## Known Constraint

`git` is not available in the current PowerShell environment, so the design document cannot be committed from this workspace session unless Git becomes available.
