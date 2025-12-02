export function analytics(eventData) {
  // window._paq is what Matomo uses to track data.
  if (window._paq) {
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
}

export function analyticsTrackFilterByDistrictToggle(expandedIndex) {
  if (expandedIndex === 0) {
    analytics({
      category: "Accordion",
      action: "Toggle Filter By District Accordion",
      name: "Open",
    });
  } else if (expandedIndex === -1) {
    analytics({
      category: "Accordion",
      action: "Toggle Filter By District Accordion",
      name: "Closed",
    });
  } else {
    analytics({
      category: "Accordion",
      action: "Toggle Filter By District Accordion",
      name: "Unknown",
    });
  }
}

export function analyticsTrackSearchByAttributeToggle(expandedIndex) {
  if (expandedIndex === 0) {
    analytics({
      category: "Accordion",
      action: "Toggle Search by Attribute Accordion",
      name: "Open",
    });
  } else if (expandedIndex === -1) {
    analytics({
      category: "Accordion",
      action: "Toggle Search by Attribute Accordion",
      name: "Closed",
    });
  } else {
    analytics({
      category: "Accordion",
      action: "Toggle Search by Attribute Accordion",
      name: "Unknown",
    });
  }
}

export function analyticsTrackSelectedDistrictToggle(expandedIndex) {
  if (expandedIndex === 0) {
    analytics({
      category: "Accordion",
      action: "Toggle Selected District Accordion",
      name: "Open",
    });
  } else if (expandedIndex === -1) {
    analytics({
      category: "Accordion",
      action: "Toggle Selected District Accordion",
      name: "Closed",
    });
  } else {
    analytics({
      category: "Accordion",
      action: "Toggle Selected District Accordion",
      name: "Unknown",
    });
  }
}

export function analyticsWelcomePanelToggle(expandedIndex) {
  if (expandedIndex === 0) {
    analytics({
      category: "Accordion",
      action: "Toggle Welcome Panel Accordion",
      name: "Open",
    });
  } else if (expandedIndex === -1) {
    analytics({
      category: "Accordion",
      action: "Toggle Welcome Panel Accordion",
      name: "Closed",
    });
  } else {
    analytics({
      category: "Accordion",
      action: "Toggle Welcome Panel Accordion",
      name: "Unknown",
    });
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
