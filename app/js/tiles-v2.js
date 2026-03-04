/* tiles-v2.js
   HomeyDash v2 tile framework (contract-based)
*/
(function () {
  'use strict';

  function getCapValue(device, capId) {
    try { return device.capabilitiesObj?.[capId]?.value; }
    catch (e) { return undefined; }
  }
  
  function getV2Contract(device) {
    const raw = getCapValue(device, 'devicecapabilities_text.text1'); // CapMap container
    if (!raw || typeof raw !== 'string') return null;
  
    let capMap;
    try {
      capMap = JSON.parse(raw);
    } catch (e) {
      console.warn('[V2] Invalid CapMap JSON for device:', device?.name);
      return null;
    }
  
    // Single, authoritative validation gate
    const ok =
      capMap &&
      typeof capMap === 'object' &&
      capMap.schema === 'homeydash-tile-contract' &&
      capMap.version === 2 &&
      typeof capMap.type === 'string' &&
      capMap.caps &&
      typeof capMap.caps === 'object';
  
    return ok ? capMap : null;
  }

  /* ---------- TEMP STUB RENDERER ---------- */
  
  function renderGarageV2(tileEl, device, capMap) {
    tileEl.innerHTML = `
      <div class="v2-tile">
        <div style="font-size:14px;opacity:.8;">V2 Garage</div>
        <div style="font-size:18px;">${device?.name ?? 'Garage'}</div>
      </div>
    `;
  }
  
  /* ----------------------------------------- */   

   
  // For now: just detect v2. Rendering comes later.
  function routeTileV2(tileEl, device) {
    const capMap = getV2Contract(device);
    if (!capMap) return false;
  
    if (capMap.type === 'garage') {
      renderGarageV2(tileEl, device, capMap);
      return true;
    }
  
    return false;
  }

  // Expose globally (HomeyDash is global-script based)
  window.HD_TILES_V2 = {
    routeTileV2,
    getV2Contract
  };
})();
