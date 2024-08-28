export function analytics(eventData) {
  if (eventData.value) {
    window._paq.push([
      "trackEvent",
      eventData.category,
      eventData.action,
      eventData.name,
      eventData.value,
    ]);
  } else {
    window._paq.push([
      "trackEvent",
      eventData.category,
      eventData.action,
      eventData.name,
    ]);
  }
}

export function initializeMatomoTagManager(containerID) {
  // From the initial script they provide for setup
  var _mtm = (window._mtm = window._mtm || []);
  _mtm.push({ "mtm.startTime": new Date().getTime(), event: "mtm.Start" });
  var d = document,
    g = d.createElement("script"),
    s = d.getElementsByTagName("script")[0];
  g.type = "text/javascript";
  g.id = "matomo-tag-manager";
  g.async = true;
  g.src = `https://cdn.matomo.cloud/nycplanning.matomo.cloud/container_${containerID}.js`;
  s.parentNode.insertBefore(g, s);

  // To track pageviews, watching for changes to location.pathname
  let previousUrlPath = location.pathname;
  const observer = new MutationObserver(function () {
    if (location.pathname !== previousUrlPath) {
      previousUrlPath = location.pathname;
      window._paq.push(["setCustomUrl", location.href]);
      window._paq.push(["trackPageView"]);
    }
  });
  const config = { subtree: true, childList: true };
  observer.observe(document, config);
}
