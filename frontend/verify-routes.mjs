const routes = [
  "/",
  "/experiences",
  "/journeys",
  "/journeys/the-soul-of-kashi",
  "/journeys/kashi-after-dark",
  "/journeys/the-sacred-morning",
  "/journeys/the-banarasi-table",
  "/about",
  "/contact",
  "/blog",
  "/services/travel",
  "/services/stay",
  "/services/city-tour",
  "/journeys/not-a-journey",
];
for (const route of routes) {
  const response = await fetch("http://localhost:3000" + route);
  const html = await response.text();
  const titles = (html.match(/<title[\s>]/g) || []).length;
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const canonical = (html.match(/rel="canonical"/g) || []).length;
  if (response.status !== (route.endsWith("not-a-journey") ? 404 : 200))
    throw Error(route + " HTTP " + response.status);
  if (titles !== 1) throw Error(route + " title count " + titles);
  if (!route.endsWith("not-a-journey") && (h1 !== 1 || canonical !== 1))
    throw Error(route + " h1/canonical " + h1 + "/" + canonical);
  console.log(
    JSON.stringify({ route, status: response.status, titles, h1, canonical }),
  );
}
