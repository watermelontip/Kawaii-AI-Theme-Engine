/**
 * Kawaii AI Theme Engine - Main Engine
 * Coordinates Randomizer and StyleEngine to generate and apply themes
 */

import { Randomizer, KAWAII_EMOJIS, PATTERNS, randomGradient, randomBorderStyle, randomShadow, randomBorderRadius } from './utils.js';
import { StyleEngine } from './style-engine.js';

/**
 * Main KawaiiEngine class
 */
export class KawaiiEngine {
  /**
   * @param {Object} [options] - Engine options
   * @param {string} [options.seed] - Optional seed for reproducible themes
   * @param {Object} [options.presets] - Preset themes to register
   */
  constructor(options = {}) {
    this.rng = new Randomizer(options.seed);
    this.styleEngine = new StyleEngine();
    this.presets = new Map();
    this.currentTheme = null;

    // Register built-in presets if provided
    if (options.presets) {
      Object.entries(options.presets).forEach(([name, config]) => {
        this.registerPreset(name, config);
      });
    }

    // Handle window resize
    window.addEventListener('resize', () => {
      this.styleEngine.handleResize();
      if (this.currentTheme?.patterns?.type) {
        this.styleEngine.renderPattern(
          this.currentTheme.patterns.type,
          this.currentTheme.patterns.color,
          parseInt(this.currentTheme.patterns.size),
          parseFloat(this.currentTheme.patterns.opacity)
        );
      }
    });
  }

  /**
   * Register a preset theme
   * @param {string} name - Preset name
   * @param {Object|Function} config - Theme config or generator function
   */
  registerPreset(name, config) {
    this.presets.set(name, config);
  }

  /**
   * Generate a random theme configuration
   * @returns {Object} Theme configuration
   */
  generateRandomTheme() {
    // Generate random kawaii-style colors
    const primaryHue = this.rng.randInt(0, 360);
    const accentHue = (primaryHue + this.rng.randInt(30, 150)) % 360;

    const config = {
      colors: {
        'primary': this.rng.randomColor(primaryHue - 20, primaryHue + 20, 60, 100, 50, 75),
        'secondary': this.rng.randomColor(accentHue - 20, accentHue + 20, 60, 100, 50, 75),
        'background': this.rng.randomColor(primaryHue - 30, primaryHue + 30, 10, 40, 85, 98),
        'surface': this.rng.randomColor(primaryHue - 20, primaryHue + 20, 5, 30, 90, 99),
        'text': this.rng.randomColor(primaryHue - 30, primaryHue + 30, 20, 60, 15, 35),
        'text-secondary': this.rng.randomColor(primaryHue - 20, primaryHue + 20, 10, 40, 40, 60),
        'border': this.rng.randomColor(primaryHue - 10, primaryHue + 10, 20, 50, 75, 90),
        'shadow': this.rng.randomColor(primaryHue, primaryHue, 30, 60, 30, 50),
      },
      gradients: {
        'primary': randomGradient(this.rng, `${this.rng.randInt(0, 360)}deg`),
        'accent': randomGradient(this.rng, `${this.rng.randInt(0, 360)}deg`),
        'background': randomGradient(this.rng, `${this.rng.randInt(120, 240)}deg`),
      },
      patterns: {
        type: this.rng.pick(PATTERNS),
        color: this.rng.randomColor(primaryHue, primaryHue + 30, 40, 80, 60, 80),
        size: `${this.rng.randInt(15, 40)}px`,
        opacity: (this.rng.randInt(5, 25) / 100).toFixed(2),
      },
      typography: {
        'family': this.rng.pick([
          "'Quicksand', sans-serif",
          "'Comic Neue', cursive",
          "'Nunito', sans-serif",
          "'Patrick Hand', cursive",
          "'Indie Flower', cursive"
        ]),
        'heading-family': this.rng.pick([
          "'Baloo 2', cursive",
          "'Fredoka One', cursive",
          "'Bubblegum Sans', cursive",
          "'Pacifico', cursive",
          "'Lobster', cursive"
        ]),
        'size-base': `${this.rng.randInt(14, 18)}px`,
        'size-heading': `${this.rng.randInt(24, 48)}px`,
        'line-height': (this.rng.randInt(140, 200) / 100).toFixed(2),
      },
      decorations: {
        'border-radius': randomBorderRadius(this.rng),
        'border': randomBorderStyle(this.rng),
        'shadow': randomShadow(this.rng),
        'emoji': this.rng.pick(KAWAII_EMOJIS),
        'emoji-secondary': this.rng.pick(KAWAII_EMOJIS),
      },
      animations: {
        'speed': `${this.rng.randInt(200, 800)}ms`,
        'bounce': this.rng.pick(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(0.68, -0.55, 0.265, 1.55)']),
        'scale-hover': (1 + this.rng.randInt(2, 15) / 100).toFixed(3),
        'rotate-hover': `${this.rng.randInt(-15, 15)}deg`,
      },
    };

    return config;
  }

  /**
   * Apply a theme configuration
   * @param {Object} config - Theme configuration
   */
  applyTheme(config) {
    this.currentTheme = config;

    // Generate and apply CSS variables
    const vars = this.styleEngine.generateVariables(config);
    this.styleEngine.applyVariables(vars);

    // Apply pattern if specified
    if (config.patterns?.type && config.patterns.type !== 'none') {
      this.styleEngine.renderPattern(
        config.patterns.type,
        config.patterns.color,
        parseInt(config.patterns.size),
        parseFloat(config.patterns.opacity)
      );
    } else {
      this.styleEngine.clearPattern();
    }

    // Dispatch event
    window.dispatchEvent(new CustomEvent('kawaii-theme-applied', { detail: config }));
  }

  /**
   * Apply a preset theme
   * @param {string} name - Preset name
   * @returns {boolean} Whether the preset was found
   */
  applyPreset(name) {
    const preset = this.presets.get(name);
    if (!preset) {
      console.warn(`KawaiiEngine: Preset "${name}" not found`);
      return false;
    }

    const config = typeof preset === 'function' ? preset(this.rng) : preset;
    this.applyTheme(config);
    return true;
  }

  /**
   * Generate and apply a random theme
   */
  randomize() {
    const config = this.generateRandomTheme();
    this.applyTheme(config);
    return config;
  }

  /**
   * Get the current theme configuration
   * @returns {Object|null}
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Get list of available preset names
   * @returns {string[]}
   */
  getAvailablePresets() {
    return Array.from(this.presets.keys());
  }

  /**
   * Generate a CSS string for the current theme (for export)
   * @returns {string}
   */
  exportCSS() {
    if (!this.currentTheme) return '';
    const vars = this.styleEngine.generateVariables(this.currentTheme);
    return `/* Kawaii AI Theme Engine - Generated Theme */\n:root {\n${Object.entries(vars)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n')}\n}`;
  }
}
