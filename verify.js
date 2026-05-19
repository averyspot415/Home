const fs = require("fs");
const { CATEGORIES, METROS } = require("./data.js");

const requiredFiles = ["index.html", "city.html", "styles.css", "data.js", "app.js"];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function readText(file) {
  return fs.readFileSync(file, "utf8");
}

function assertAsciiOnly(file) {
  const text = readText(file);
  assert(/^[\x00-\x7F]*$/.test(text), `${file} contains non-ASCII characters`);
}

for (const file of requiredFiles) {
  assert(fs.existsSync(file), `Missing required file: ${file}`);
}

assert(METROS.length === 50, `Expected 50 metros, found ${METROS.length}`);
assert(CATEGORIES.length === 10, `Expected 10 categories, found ${CATEGORIES.length}`);

const slugs = new Set();
const ranks = new Set();

for (const metro of METROS) {
  assert(hasText(metro.slug), `Metro has invalid slug: ${metro.slug}`);
  assert(!slugs.has(metro.slug), `Duplicate slug: ${metro.slug}`);
  slugs.add(metro.slug);

  assert(Number.isInteger(metro.rank), `${metro.name || metro.slug} has non-integer rank: ${metro.rank}`);
  assert(metro.rank >= 1 && metro.rank <= 50, `${metro.name || metro.slug} has out-of-range rank: ${metro.rank}`);
  assert(!ranks.has(metro.rank), `Duplicate rank: ${metro.rank}`);
  ranks.add(metro.rank);

  for (const category of CATEGORIES) {
    const links = metro.links && metro.links[category.id];
    assert(Array.isArray(links) && links.length > 0, `${metro.name} missing links for ${category.id}`);

    for (const link of links) {
      assert(hasText(link.label), `${metro.name} has invalid link label in ${category.id}: ${JSON.stringify(link)}`);
      assert(hasText(link.url), `${metro.name} has invalid link url in ${category.id}: ${JSON.stringify(link)}`);
      assert(hasText(link.type), `${metro.name} has invalid link type in ${category.id}: ${JSON.stringify(link)}`);
      assert(/^https?:\/\//.test(link.url), `${metro.name} has invalid link url in ${category.id}: ${JSON.stringify(link)}`);
    }
  }
}

for (let rank = 1; rank <= 50; rank += 1) {
  assert(ranks.has(rank), `Missing rank: ${rank}`);
}

for (const file of ["index.html", "city.html"]) {
  assert(!readText(file).includes('href="#"'), `${file} contains placeholder href`);
}

for (const file of ["app.js", "styles.css"]) {
  assertAsciiOnly(file);
}

console.log(`Verified ${METROS.length} metros across ${CATEGORIES.length} categories.`);
