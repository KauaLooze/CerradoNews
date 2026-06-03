/**
 * CerradoNews — js/weather.js
 * Módulo de previsão do tempo.
 * Tenta buscar dados reais da API HG Brasil;
 * em caso de falha, usa os dados demo de data.js.
 */

'use strict';

/* Cache por cidade para evitar requisições repetidas */
const weatherCache = {};

/**
 * Formata a hora atual no padrão HH:MM.
 * @returns {string}
 */
function nowTime() {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

/**
 * Renderiza o HTML do widget de clima no DOM.
 * @param {string}  city   - Nome da cidade selecionada
 * @param {object}  data   - Objeto com dados de clima
 * @param {boolean} isLive - true se os dados vieram da API real
 */
function renderWeatherUI(city, data, isLive) {
  const forecastHTML = data.forecast.map(f => `
    <div class="forecast-day">
      <div class="forecast-day__name">${f.d}</div>
      <div class="forecast-day__icon">
        <i data-lucide="${f.i}" style="width:20px;height:20px;"></i>
      </div>
      <div class="forecast-day__temp">${f.t}</div>
    </div>
  `).join('');

  const sourceHTML = isLive
    ? `<span style="color:rgba(255,255,255,.5);">●</span> Ao vivo · HG Brasil · ${nowTime()}`
    : 'Dados demonstrativos · Integre a API HG Brasil para dados reais';

  document.getElementById('weather-content').innerHTML = `
    <div class="weather-main">
      <div class="weather-icon-wrap">
        <i data-lucide="${data.icon}" style="width:36px;height:36px;"></i>
      </div>
      <div class="weather-temp-block">
        <div class="weather-temp">${data.temp}<sup>°C</sup></div>
        <div class="weather-desc">${data.desc} — ${city}</div>
      </div>
    </div>
    <div class="weather-details">
      <div class="weather-detail">
        <div class="weather-detail__label">Umidade</div>
        <div class="weather-detail__value">${data.humidity}%</div>
      </div>
      <div class="weather-detail">
        <div class="weather-detail__label">Vento</div>
        <div class="weather-detail__value">${data.wind}</div>
      </div>
      <div class="weather-detail">
        <div class="weather-detail__label">Índice UV</div>
        <div class="weather-detail__value">${data.uv}</div>
      </div>
    </div>
    <div class="weather-forecast">${forecastHTML}</div>
    <div class="widget-source">${sourceHTML}</div>
  `;

  /* Reprocessa os ícones Lucide injetados dinamicamente */
  lucide.createIcons();
}

/**
 * Exibe spinner de loading no widget de clima.
 */
function showWeatherLoading() {
  document.getElementById('weather-content').innerHTML = `
    <div class="loading-state">
      <div class="spinner"></div>
      <span>Carregando previsão…</span>
    </div>
  `;
}

/**
 * Busca os dados de clima para uma cidade.
 * Usa cache para evitar múltiplas requisições.
 * @param {string} city - Nome da cidade
 */
async function loadWeatherForCity(city) {
  showWeatherLoading();

  /* Retorna do cache se disponível */
  if (weatherCache[city]) {
    const { data, live } = weatherCache[city];
    renderWeatherUI(city, data, live);
    return;
  }

  try {
    const cityQuery = encodeURIComponent(CITIES[city].query);
    const url = `https://api.hgbrasil.com/weather?format=json-cors&city_name=${cityQuery}`;

    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    const r = json.results;

    const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const data = {
      icon:     conditionIcon(r.condition_slug),
      temp:     r.temp,
      desc:     r.description,
      humidity: r.humidity,
      wind:     r.wind_speedy,
      uv:       '—',
      forecast: (r.forecast || []).slice(0, 5).map(f => ({
        d: DAYS[new Date(f.date).getDay()],
        i: conditionIcon(f.condition),
        t: `${f.max}°`,
      })),
    };

    weatherCache[city] = { data, live: true };
    renderWeatherUI(city, data, true);

  } catch (err) {
    console.warn(`[CerradoNews] Weather API falhou para "${city}":`, err.message);
    const data = DEMO_WEATHER[city];
    weatherCache[city] = { data, live: false };
    renderWeatherUI(city, data, false);
  }
}

/**
 * Handler de clique nas abas de cidade.
 * @param {HTMLElement} btn  - Botão clicado
 * @param {string}      city - Nome da cidade
 */
function selectCity(btn, city) {
  document.querySelectorAll('.weather-tab').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
  loadWeatherForCity(city);
}
