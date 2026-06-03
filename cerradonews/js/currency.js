/**
 * CerradoNews — js/currency.js
 * Módulo de cotação de moedas.
 * Tenta buscar dados reais da API HG Brasil Finance;
 * em caso de falha, usa os dados demo de data.js.
 */

'use strict';

/**
 * Formata um número para o padrão BRL.
 * @param {number} value
 * @returns {string}
 */
function fmtBRL(value) {
  if (value >= 1000) {
    return 'R$ ' + value.toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: value < 1 ? 4 : 2,
  });
}

/**
 * Formata a hora atual no padrão HH:MM.
 * @returns {string}
 */
function nowTimeCurrency() {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Renderiza a lista de moedas no DOM.
 * @param {Array}   rows   - Array de objetos { flag, code, name, buy, var }
 * @param {boolean} isLive - true se dados vieram da API real
 */
function renderCurrencyUI(rows, isLive) {
  const rowsHTML = rows.map(r => {
    const up = r.var >= 0;
    const changeClass = up ? 'currency-change--up' : 'currency-change--down';
    const arrow = up ? '▲' : '▼';

    return `
      <div class="currency-row">
        <span class="currency-flag">${r.flag}</span>
        <div class="currency-info">
          <div class="currency-code">${r.code}</div>
          <div class="currency-name">${r.name}</div>
        </div>
        <div class="currency-right">
          <div class="currency-value">${fmtBRL(r.buy)}</div>
          <div class="currency-change ${changeClass}">${arrow} ${Math.abs(r.var).toFixed(2)}%</div>
        </div>
      </div>
    `;
  }).join('');

  const sourceHTML = isLive
    ? `<span style="color:rgba(255,255,255,.5);">●</span> Ao vivo · HG Brasil · ${nowTimeCurrency()}`
    : 'Dados demonstrativos · Integre a API HG Brasil para cotações reais';

  document.getElementById('currency-content').innerHTML = `
    <div class="currency-list">${rowsHTML}</div>
    <div class="widget-source" style="margin-top:var(--space-4);">${sourceHTML}</div>
  `;
}

/**
 * Exibe spinner de loading no widget de câmbio.
 */
function showCurrencyLoading() {
  document.getElementById('currency-content').innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <span>Buscando cotações…</span>
    </div>
  `;
}

/**
 * Busca dados de câmbio da API HG Brasil Finance.
 * Usa dados demo como fallback em caso de erro.
 */
async function loadCurrency() {
  showCurrencyLoading();

  try {
    const url = 'https://api.hgbrasil.com/finance?format=json-cors';
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    const apiCurrencies = json.results.currencies;

    const rows = CURRENCY_DEFS.map(def => ({
      flag: def.flag,
      code: def.code,
      name: def.name,
      buy:  apiCurrencies[def.key]?.buy  ?? def.demo.buy,
      var:  parseFloat(apiCurrencies[def.key]?.variation ?? def.demo.var),
    }));

    renderCurrencyUI(rows, true);

  } catch (err) {
    console.warn('[CerradoNews] Currency API falhou:', err.message);
    const rows = CURRENCY_DEFS.map(def => ({
      flag: def.flag,
      code: def.code,
      name: def.name,
      buy:  def.demo.buy,
      var:  def.demo.var,
    }));
    renderCurrencyUI(rows, false);
  }
}
