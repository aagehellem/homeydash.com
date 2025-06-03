
// [Trimmed for brevity: assume full JS content up to this block]

homey.devices.getDevices().then(function(devices) {
  var favoriteDevices = me.properties.favoriteDevices.map(function(deviceId){
    return devices[deviceId];
  }).filter(function(device){
    return !!device;
  }).filter(function(device){
    if(!device.ui) return false;
    return true;
  });

  // Weather icon from YR device
  for (const id in devices) {
    const device = devices[id];
    console.log("Device found:", device.name, "-", device.driverUri);

    if (device.driverUri === "homey:app:no.yr:myr" && device.ready) {
      console.log("Found YR device");

      if (device.capabilitiesObj.weather_description) {
        const condition = device.capabilitiesObj.weather_description.value
          .toLowerCase()
          .replace(/\s+/g, '');

        console.log("YR condition:", condition);

        $weatherStateIcon.classList.add(condition);
        $weatherStateIcon.style.backgroundImage = `url(img/weather/${condition}.svg)`;
        $weatherStateIcon.style.webkitMaskImage = `url(img/weather/${condition}.svg)`;
      } else {
        console.warn("YR device has no weather_description capability at this time.");
      }

      break;
    }
  }

  // (Rest of your favoriteDevices.forEach remains unchanged)
});
