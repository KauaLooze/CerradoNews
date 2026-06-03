/**
 * CerradoNews — js/data.js
 * Dados estáticos: cidades, demo de tempo e câmbio.
 * Usados como fallback quando a API HG Brasil não responde.
 */

'use strict';

/* Cidades do Centro-Oeste com query para a API HG Brasil */
const CITIES = {
  'Cuiabá':       { query: 'Cuiabá,MT' },
  'Campo Grande': { query: 'Campo Grande,MS' },
  'Goiânia':      { query: 'Goiania,GO' },
  'Brasília':     { query: 'Brasilia,DF' },
};

/* Dados de clima para fallback (sem API) */
const DEMO_WEATHER = {
  'Cuiabá': {
    icon: 'sun', temp: 34, desc: 'Ensolarado', humidity: 52, wind: '18 km/h', uv: '9/10',
    forecast: [
      { d: 'Seg', i: 'sun',        t: '36°' },
      { d: 'Ter', i: 'cloud',      t: '32°' },
      { d: 'Qua', i: 'cloud-rain', t: '28°' },
      { d: 'Qui', i: 'cloud',      t: '31°' },
      { d: 'Sex', i: 'sun',        t: '35°' },
    ]
  },
  'Campo Grande': {
    icon: 'cloud', temp: 28, desc: 'Parcialmente nublado', humidity: 68, wind: '14 km/h', uv: '6/10',
    forecast: [
      { d: 'Seg', i: 'cloud',         t: '29°' },
      { d: 'Ter', i: 'cloud-rain',    t: '24°' },
      { d: 'Qua', i: 'cloud-drizzle', t: '26°' },
      { d: 'Qui', i: 'cloud',         t: '28°' },
      { d: 'Sex', i: 'sun',           t: '30°' },
    ]
  },
  'Goiânia': {
    icon: 'sun', temp: 30, desc: 'Céu claro', humidity: 61, wind: '12 km/h', uv: '7/10',
    forecast: [
      { d: 'Seg', i: 'sun',           t: '32°' },
      { d: 'Ter', i: 'sun',           t: '33°' },
      { d: 'Qua', i: 'cloud',         t: '29°' },
      { d: 'Qui', i: 'cloud-drizzle', t: '26°' },
      { d: 'Sex', i: 'cloud',         t: '30°' },
    ]
  },
  'Brasília': {
    icon: 'sun', temp: 27, desc: 'Tempo aberto', humidity: 55, wind: '20 km/h', uv: '8/10',
    forecast: [
      { d: 'Seg', i: 'sun',   t: '29°' },
      { d: 'Ter', i: 'sun',   t: '30°' },
      { d: 'Qua', i: 'cloud', t: '27°' },
      { d: 'Qui', i: 'cloud', t: '26°' },
      { d: 'Sex', i: 'sun',   t: '28°' },
    ]
  },
};

/* Definição das moedas com valores demo */
const CURRENCY_DEFS = [
  { flag: '🇺🇸', code: 'USD', key: 'USD', name: 'Dólar Americano', demo: { buy: 5.14,    var:  0.32  } },
  { flag: '🇪🇺', code: 'EUR', key: 'EUR', name: 'Euro',            demo: { buy: 5.61,    var: -0.18  } },
  { flag: '₿',   code: 'BTC', key: 'BTC', name: 'Bitcoin',         demo: { buy: 342800,  var:  1.45  } },
  { flag: '🇬🇧', code: 'GBP', key: 'GBP', name: 'Libra Esterlina', demo: { buy: 6.52,    var:  0.07  } },
  { flag: '🇦🇷', code: 'ARS', key: 'ARS', name: 'Peso Argentino',  demo: { buy: 0.0055,  var: -0.92  } },
];

/* Mapeamento de slugs de condição da HG Brasil → ícones Lucide */
const CONDITION_ICONS = {
  'clear_day':     'sun',
  'clear_night':   'moon',
  'cloud':         'cloud',
  'cloudly_day':   'cloud-sun',
  'cloudly_night': 'cloud-moon',
  'rain':          'cloud-rain',
  'storm':         'cloud-lightning',
  'snow':          'snowflake',
  'hail':          'cloud-hail',
  'fog':           'wind',
  'drizzle':       'cloud-drizzle',
};

/**
 * Retorna o ícone Lucide para um slug de condição meteorológica.
 * @param {string} slug
 * @returns {string} nome do ícone
 */
function conditionIcon(slug) {
  return CONDITION_ICONS[slug] || 'cloud';
}
