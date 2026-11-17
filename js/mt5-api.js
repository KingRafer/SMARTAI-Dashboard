/* SMARTAI MT5-shaped demo data. Clearly simulated; no live account connection. */
(function (w) {
  'use strict';
  var demoAccounts = [
    { account_id:'ACC01', status:'DEMO', balance:89795.21, equity:90786.35, deposit_awal:10000.00, daily_profit:991.14, total_profit:null, daily_dd:null, total_penarikan:73862.00, updated_at:'DEMO DATA · illustrative sample' },
    { account_id:'ACC02', status:'DEMO', balance:106455.80, equity:106793.83, deposit_awal:10000.00, daily_profit:338.03, total_profit:null, daily_dd:null, total_penarikan:28000.00, updated_at:'DEMO DATA · illustrative sample' },
    { account_id:'ACC03', status:'DEMO', balance:645950.70, equity:656274.00, deposit_awal:60000.00, daily_profit:10323.30, total_profit:null, daily_dd:null, total_penarikan:5540000.00, updated_at:'DEMO DATA · illustrative sample' }
  ];
  function formatUSD(value) {
    if (value === null || value === undefined || value === '' || !Number.isFinite(Number(value))) return '—';
    return new Intl.NumberFormat('en-US', { style:'currency', currency:'USD', maximumFractionDigits:2 }).format(Number(value));
  }
  function formatNumber(value, digits) {
    if (value === null || value === undefined || value === '' || !Number.isFinite(Number(value))) return '—';
    return Number(value).toLocaleString('en-US', { minimumFractionDigits:digits || 2, maximumFractionDigits:digits || 2 });
  }
  function escape(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(c) {
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
    });
  }
  async function getAccounts() {
    return demoAccounts.map(function(account){ return Object.assign({}, account); });
  }
  w.SmartAIMT5 = { base:'DEMO MODE', getAccounts:getAccounts, formatUSD:formatUSD, formatNumber:formatNumber, escape:escape };
})(window);
