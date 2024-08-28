
export function analytics(eventData) {
  if(eventData.value) {
    _paq.push(['trackEvent', eventData.category, eventData.action, eventData.name, eventData.value])
  } else {
    _paq.push(['trackEvent', eventData.category, eventData.action, eventData.name])
  }
}

export function initializeMatomoTagManager(containerID) {
  var _mtm = window._mtm = window._mtm || [];
  _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.type='text/javascript';
  g.id='matomo-tag-manager';
  g.async=true; g.src=`https://cdn.matomo.cloud/nycplanning.matomo.cloud/container_${containerID}.js`; s.parentNode.insertBefore(g,s);
}
