(function () {
  const { CATEGORIES = [], METROS = [] } = window.AVERYSPOT_DATA || {};

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function externalAttrs() {
    return 'target="_blank" rel="noopener"';
  }

  function getHostname(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch (error) {
      return String(url || "");
    }
  }

  function linkCard(link) {
    const href = escapeHtml(link?.url || "#");
    const type = escapeHtml(link?.type || "Link");
    const label = escapeHtml(link?.label || "Open link");
    const host = escapeHtml(getHostname(link?.url));

    return `
      <a class="link-card" href="${href}" ${externalAttrs()}>
        <span class="link-type">${type}</span>
        <strong>${label}</strong>
        <small>${host}</small>
      </a>
    `;
  }

  function metroUrl(slug) {
    return `city.html?metro=${encodeURIComponent(slug)}`;
  }

  function getMetroFromUrl() {
    return new URLSearchParams(window.location.search).get("metro");
  }

  function categoryById(id) {
    return CATEGORIES.find((category) => category.id === id);
  }

  function categoryLabel(id) {
    return categoryById(id)?.label || id;
  }

  function renderTags(tags) {
    return (tags || [])
      .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
      .join("");
  }

  function renderHomeHero() {
    const heroPanel = document.querySelector("#heroPanel");
    if (!heroPanel) return;

    heroPanel.innerHTML = `
      <div class="hero-panel-top">
        <span class="panel-kicker">Metro board</span>
        <span class="panel-status">50 live guides</span>
      </div>
      <div class="hero-city-list">
        ${METROS.slice(0, 5)
          .map(
            (metro) => `
              <a class="hero-city" href="${escapeHtml(metroUrl(metro.slug))}">
                <span>#${escapeHtml(metro.rank)}</span>
                <strong>${escapeHtml(metro.name)}</strong>
                <small>${escapeHtml(metro.state)} / ${escapeHtml(metro.region)}</small>
              </a>
            `
          )
          .join("")}
      </div>
      <div class="hero-panel-footer">
        <span>Official links</span>
        <span>Booking paths</span>
        <span>Local video</span>
      </div>
    `;
  }

  function renderQuickActions() {
    const quickActions = document.querySelector("#quickActions");
    if (!quickActions) return;

    const actionIds = ["hotels", "food", "events", "shopping", "wellness"];
    quickActions.innerHTML = actionIds
      .map((id) => {
        const category = categoryById(id);
        const label = category?.label || id;
        return `<a class="quick-action" href="#cities" data-category="${escapeHtml(id)}">${escapeHtml(label)}</a>`;
      })
      .join("");
  }

  function renderCategoryGrid() {
    const categoryGrid = document.querySelector("#categoryGrid");
    if (!categoryGrid) return;

    categoryGrid.innerHTML = CATEGORIES.map(
      (category) => `
        <article class="category-card" id="category-${escapeHtml(category.id)}">
          <h3>${escapeHtml(category.label)}</h3>
          <p>${escapeHtml(category.summary)}</p>
        </article>
      `
    ).join("");
  }

  function renderRegionFilter() {
    const regionFilter = document.querySelector("#regionFilter");
    if (!regionFilter) return;

    const regions = Array.from(new Set(METROS.map((metro) => metro.region).filter(Boolean))).sort();
    regionFilter.innerHTML = '<option value="all">All regions</option>';
    regionFilter.insertAdjacentHTML(
      "beforeend",
      regions.map((region) => `<option value="${escapeHtml(region)}">${escapeHtml(region)}</option>`).join("")
    );
  }

  function cityCard(metro) {
    return `
      <a class="city-card" href="${escapeHtml(metroUrl(metro.slug))}">
        <span class="city-rank">#${escapeHtml(metro.rank)}</span>
        <h3>${escapeHtml(metro.name)}, ${escapeHtml(metro.state)}</h3>
        <p>${escapeHtml(metro.summary)}</p>
        <div class="tag-row">${renderTags(metro.tags)}</div>
        <small>${escapeHtml(metro.region)}</small>
      </a>
    `;
  }

  function metroMatches(metro, searchTerm, region) {
    const haystack = [
      metro.name,
      metro.state,
      metro.region,
      ...(metro.tags || [])
    ]
      .join(" ")
      .toLowerCase();

    const searchMatches = !searchTerm || haystack.includes(searchTerm);
    const regionMatches = region === "all" || metro.region === region;
    return searchMatches && regionMatches;
  }

  function renderHomeCities() {
    const cityGrid = document.querySelector("#cityGrid");
    const citySearch = document.querySelector("#citySearch");
    const regionFilter = document.querySelector("#regionFilter");
    const emptyState = document.querySelector("#emptyState");
    if (!cityGrid) return;

    const searchTerm = (citySearch?.value || "").trim().toLowerCase();
    const region = regionFilter?.value || "all";
    const matches = METROS.filter((metro) => metroMatches(metro, searchTerm, region));

    cityGrid.innerHTML = matches.map(cityCard).join("");
    if (emptyState) emptyState.hidden = matches.length > 0;
  }

  function wireHomeFilters() {
    const citySearch = document.querySelector("#citySearch");
    const regionFilter = document.querySelector("#regionFilter");

    citySearch?.addEventListener("input", renderHomeCities);
    regionFilter?.addEventListener("change", renderHomeCities);
  }

  function renderHome() {
    renderHomeHero();
    renderQuickActions();
    renderCategoryGrid();
    renderRegionFilter();
    renderHomeCities();
    wireHomeFilters();
  }

  function renderMissingCity(cityPage) {
    document.title = "City not found | AverySpot USA";
    cityPage.innerHTML = `
      <section class="section missing-city">
        <p class="eyebrow">City guide</p>
        <h1>We could not find that metro guide.</h1>
        <p>Return to the city index and choose one of the top 50 U.S. metros.</p>
        <a class="button primary" href="index.html#cities">Back to cities</a>
      </section>
    `;
  }

  function topActions(metro) {
    return ["official", "hotels", "food"]
      .map((id) => metro.links?.[id]?.[0])
      .filter(Boolean)
      .map(linkCard)
      .join("");
  }

  function categorySection(metro, category) {
    const links = metro.links?.[category.id] || [];
    return `
      <article class="city-category" id="${escapeHtml(category.id)}">
        <div class="section-heading">
          <p class="eyebrow">${escapeHtml(category.label)}</p>
          <h2>${escapeHtml(category.label)} in ${escapeHtml(metro.name)}</h2>
          <p>${escapeHtml(category.summary)}</p>
        </div>
        <div class="link-grid">
          ${links.map(linkCard).join("")}
        </div>
      </article>
    `;
  }

  function renderCity() {
    const cityPage = document.querySelector("#cityPage");
    if (!cityPage) return;

    const slug = getMetroFromUrl();
    const metro = METROS.find((item) => item.slug === slug);
    if (!metro) {
      renderMissingCity(cityPage);
      return;
    }

    document.title = `${metro.name}, ${metro.state} | AverySpot USA`;
    cityPage.innerHTML = `
      <section class="city-hero">
        <a class="back-link" href="index.html#cities">Back to city index</a>
        <p class="eyebrow">#${escapeHtml(metro.rank)} metro guide</p>
        <h1>${escapeHtml(metro.name)}, ${escapeHtml(metro.state)}</h1>
        <p>${escapeHtml(metro.summary)}</p>
        <div class="tag-row">${renderTags(metro.tags)}</div>
      </section>
      <section class="section top-actions" aria-labelledby="topActionsTitle">
        <div class="section-heading">
          <p class="eyebrow">Start here</p>
          <h2 id="topActionsTitle">Top actions for ${escapeHtml(metro.name)}</h2>
        </div>
        <div class="link-grid">${topActions(metro)}</div>
      </section>
      <section class="section city-categories" aria-label="${escapeHtml(metro.name)} city categories">
        ${CATEGORIES.map((category) => categorySection(metro, category)).join("")}
      </section>
    `;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const page = document.body.dataset.page;
    if (page === "home") renderHome();
    if (page === "city") renderCity();
  });

  window.AverySpotApp = {
    externalAttrs,
    linkCard,
    metroUrl,
    getMetroFromUrl,
    renderHome,
    renderCity
  };
})();
