/* SMARTAI MT5-shaped demo data. Clearly simulated; no live account connection. */
(function (w) {
  'use strict';
  var demoAccounts = [
    { account_id:'ACC01', status:'DEMO', balance:89795.21, equity:90786.35, deposit_awal:10000.00, daily_profit:991.14, total_profit:80795.21, daily_dd:1.2, total_penarikan:73862.00, updated_at:'DEMO DATA · illustrative sample' },
    { account_id:'ACC02', status:'DEMO', balance:106455.80, equity:106793.83, deposit_awal:10000.00, daily_profit:338.03, total_profit:96455.80, daily_dd:0.8, total_penarikan:28000.00, updated_at:'DEMO DATA · illustrative sample' },
    { account_id:'ACC03', status:'DEMO', balance:645950.70, equity:656274.00, deposit_awal:60000.00, daily_profit:10323.30, total_profit:585950.70, daily_dd:2.1, total_penarikan:5540000.00, updated_at:'DEMO DATA · illustrative sample' }
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

  // Deterministic pseudo-random based on seed (account + date)
  function seededRand(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  /**
   * Generate demo daily profit history for a given year-month.
   * Returns array of { date: 'YYYY-MM-DD', profit: number, account_id: string }
   */
  function getDailyHistory(year, month, accountId) {
    var results = [];
    var daysInMonth = new Date(year, month, 0).getDate();
    var accounts = accountId
      ? demoAccounts.filter(function(a) { return a.account_id === accountId; })
      : demoAccounts;

    accounts.forEach(function(acc) {
      var base = Number(acc.daily_profit) || 200;
      for (var d = 1; d <= daysInMonth; d++) {
        var dateStr = year + '-' + String(month).padStart(2, '0') + '-' + String(d).padStart(2, '0');
        var seed = year * 10000 + month * 100 + d + (acc.account_id.charCodeAt(4) || 1) * 17;
        var r = seededRand(seed);
        var weekday = new Date(year, month - 1, d).getDay(); // 0=Sun

        // Weekend: often flat / small
        var profit;
        if (weekday === 0 || weekday === 6) {
          profit = r < 0.75 ? 0 : (r < 0.9 ? base * 0.15 * (r - 0.5) : base * 0.4 * (r - 0.5));
        } else {
          // Weekday: mostly positive with occasional loss
          if (r < 0.12) {
            profit = -(base * (0.3 + r * 1.5)); // loss day
          } else if (r < 0.25) {
            profit = base * (0.1 + r * 0.4); // small
          } else if (r < 0.7) {
            profit = base * (0.6 + r * 0.8); // normal
          } else if (r < 0.9) {
            profit = base * (1.2 + r * 0.9); // strong
          } else {
            profit = base * (1.8 + r * 1.5); // big day
          }
        }
        profit = Math.round(profit * 100) / 100;
        results.push({
          date: dateStr,
          profit: profit,
          account_id: acc.account_id
        });
      }
    });
    return results;
  }

  async function getAccounts() {
    return demoAccounts.map(function(account){ return Object.assign({}, account); });
  }

  w.SmartAIMT5 = {
    base: 'DEMO MODE',
    getAccounts: getAccounts,
    getDailyHistory: getDailyHistory,
    formatUSD: formatUSD,
    formatNumber: formatNumber,
    escape: escape
  };
})(window);
