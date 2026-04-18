/**
 * Theme: default follows prefers-color-scheme ("auto").
 * Manual light/dark is stored; double-click the toggle resets to auto.
 */
(function (window) {
  'use strict';

  var MODE_KEY = 'portfolioThemeMode';
  var LEGACY_KEY = 'theme';

  function storageOk() {
    try {
      var k = '__portfolio_theme_test__';
      localStorage.setItem(k, k);
      localStorage.removeItem(k);
      return true;
    } catch (e) {
      return false;
    }
  }

  function getMode() {
    if (!storageOk()) return 'auto';
    try {
      var m = localStorage.getItem(MODE_KEY);
      if (m === 'auto' || m === 'light' || m === 'dark') {
        return m;
      }
      var leg = localStorage.getItem(LEGACY_KEY);
      if (leg === 'light' || leg === 'dark') {
        localStorage.setItem(MODE_KEY, leg);
        localStorage.removeItem(LEGACY_KEY);
        return leg;
      }
    } catch (e) {}
    return 'auto';
  }

  function getSystem() {
    try {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (e) {}
    return 'light';
  }

  function resolve() {
    var mode = getMode();
    if (mode === 'light' || mode === 'dark') {
      return mode;
    }
    return getSystem();
  }

  function apply() {
    document.documentElement.setAttribute('data-theme', resolve());
  }

  function setMode(mode) {
    if (!storageOk()) {
      apply();
      return;
    }
    try {
      if (mode === 'auto' || mode === 'light' || mode === 'dark') {
        localStorage.setItem(MODE_KEY, mode);
        localStorage.removeItem(LEGACY_KEY);
      }
    } catch (e) {}
    apply();
  }

  window.PortfolioTheme = {
    getMode: getMode,
    getSystem: getSystem,
    resolve: resolve,
    apply: apply,
    setMode: setMode
  };

  apply();
})(window);
