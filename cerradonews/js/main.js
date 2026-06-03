/**
 * CerradoNews — js/main.js
 * Ponto de entrada principal.
 * Inicializa todos os módulos após o carregamento do DOM.
 *
 * Ordem de carregamento (via index.html):
 *   1. data.js      → constantes e dados demo
 *   2. weather.js   → módulo de clima
 *   3. currency.js  → módulo de câmbio
 *   4. ui.js        → interações de interface
 *   5. main.js      → inicialização (este arquivo)
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ── Ícones Lucide ──────────────────────────────────────── */
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  } else {
    console.warn('[CerradoNews] Lucide não carregado.');
  }

  /* ── UI ─────────────────────────────────────────────────── */
  initDate();
  initMasthead();
  initActiveNav();
  initWeatherTabs();
  initNewsletter();

  /* ── APIs ───────────────────────────────────────────────── */
  loadWeatherForCity('Cuiabá');
  loadCurrency();

  /* ── Log de inicialização ───────────────────────────────── */
  console.log('%cCerradoNews ✓', 'color:#BE8C32;font-weight:bold;font-size:14px;');
  console.log('%cO Jornal do Coração do Brasil', 'color:#35513B;font-size:11px;');

});
