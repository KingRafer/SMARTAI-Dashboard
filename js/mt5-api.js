/* SMARTAI MT5 public read API client. No secret key belongs in this file. */
(function (w) {
  'use strict';
  var BASE = 'https://smartinvestama.com/api/api_v2';
  function formatUSD(value) {
    if (value === null || value === undefined || value === '' || !Number.isFinite(Number(value))) return '—';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(Number(value));
  }
  function formatNumber(value, digits) {
    if (value === null || value === undefined || value === '' || !Number.isFinite(Number(value))) return '—';
    return Number(value).toLocaleString('en-US', { minimumFractionDigits: digits || 2, maximumFractionDigits: digits || 2 });
  }
  function escape(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) {
      return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[c];
    });
  }
  async function getAccounts() {
    var response = await fetch(BASE + '/live.php?t=' + Date.now(), {
      method: 'GET', cache: 'no-store', headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error('MT5 API HTTP ' + response.status);
    var payload = await response.json();
    if (!payload || payload.ok !== true || !Array.isArray(payload.accounts)) {
      throw new Error('Format respons MT5 API tidak valid');
    }
    return payload.accounts;
  }
  w.SmartAIMT5 = {
    base: BASE,
    getAccounts: getAccounts,
    formatUSD: formatUSD,
    formatNumber: formatNumber,
    escape: escape
  };
})(window);
