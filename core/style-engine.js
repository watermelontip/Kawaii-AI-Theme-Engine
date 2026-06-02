/**
 * Kawaii AI Theme Engine - Style Engine
 * Handles CSS variable generation, pattern rendering, and DOM updates
 */

import { Randomizer, randomGradient, randomBorderStyle, randomShadow, randomBorderRadius } from './utils.js';

/**
 * StyleEngine class - manages CSS variable injection and pattern rendering
 */
export class StyleEngine {
  constructor() {
    this.styleElement = null;
    this.patternCanvas = null;
    this._init();
  }

  /**
   * Initialize the style engine
   * @private
   */
  _init() {
    // Create or find the style element for CSS variables
    this.styleElement = document.getElementById('kawaii-theme-vars');
    if (!this.styleElement) {
      this.styleElement = document.createElement('style');
      this.styleElement.id = 'kawaii-theme-vars';
      document.head.appendChild(this.styleElement);
    }

    // Create or find the pattern canvas
    this.patternCanvas = document.getElementById('kawaii-pattern-canvas');
    if (!this.patternCanvas) {
      this.patternCanvas = document.createElement('canvas');
      this.patternCanvas.id = 'kawaii-pattern-canvas';
      this.patternCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;opacity:0.3;';
      document.body.appendChild(this.patternCanvas);
    }
  }

  /**
   * Generate a complete CSS variable map from a theme config
   * @param {Object} config - Theme configuration object
   * @returns {Object} CSS variable map
   */
  generateVariables(config) {
    const vars = {};

    // Colors
    if (config.colors) {
      Object.entries(config.colors).forEach(([key, value]) => {
        vars[`--kawaii-color-${key}`] = value;
      });
    }

    // Gradients
    if (config.gradients) {
      Object.entries(config.gradients).forEach(([key, value]) => {
        vars[`--kawaii-gradient-${key}`] = value;
      });
    }

    // Patterns
    if (config.patterns) {
      vars['--kawaii-pattern-type'] = config.patterns.type || 'none';
      vars['--kawaii-pattern-color'] = config.patterns.color || 'transparent';
      vars['--kawaii-pattern-size'] = config.patterns.size || '20px';
      vars['--kawaii-pattern-opacity'] = config.patterns.opacity || '0.1';
    }

    // Typography
    if (config.typography) {
      Object.entries(config.typography).forEach(([key, value]) => {
        vars[`--kawaii-font-${key}`] = value;
      });
    }

    // Decorations
    if (config.decorations) {
      Object.entries(config.decorations).forEach(([key, value]) => {
        vars[`--kawaii-deco-${key}`] = value;
      });
    }

    // Animations
    if (config.animations) {
      Object.entries(config.animations).forEach(([key, value]) => {
        vars[`--kawaii-anim-${key}`] = value;
      });
    }

    return vars;
  }

  /**
   * Apply CSS variables to the document
   * @param {Object} vars - CSS variable map
   */
  applyVariables(vars) {
    const css = `:root {\n${Object.entries(vars)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n')}\n}`;
    this.styleElement.textContent = css;
  }

  /**
   * Render a pattern onto the canvas overlay
   * @param {string} patternType - Pattern type from PATTERNS
   * @param {string} color - Pattern color
   * @param {number} size - Pattern size in pixels
   * @param {number} opacity - Pattern opacity (0-1)
   */
  renderPattern(patternType, color, size = 20, opacity = 0.1) {
    const canvas = this.patternCanvas;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.opacity = opacity;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    switch (patternType) {
      case 'polka-dot':
        this._drawPolkaDots(ctx, canvas, size);
        break;
      case 'stripe':
        this._drawStripes(ctx, canvas, size);
        break;
      case 'checker':
        this._drawChecker(ctx, canvas, size);
        break;
      case 'diagonal':
        this._drawDiagonal(ctx, canvas, size);
        break;
      case 'zigzag':
        this._drawZigzag(ctx, canvas, size);
        break;
      case 'wave':
        this._drawWave(ctx, canvas, size);
        break;
      case 'heart':
        this._drawHearts(ctx, canvas, size);
        break;
      case 'star':
        this._drawStars(ctx, canvas, size);
        break;
      default:
        break;
    }
  }

  /**
   * Clear the pattern canvas
   */
  clearPattern() {
    const ctx = this.patternCanvas.getContext('2d');
    ctx.clearRect(0, 0, this.patternCanvas.width, this.patternCanvas.height);
  }

  // Pattern drawing methods
  _drawPolkaDots(ctx, canvas, size) {
    for (let x = 0; x < canvas.width; x += size * 2) {
      for (let y = 0; y < canvas.height; y += size * 2) {
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, size / 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  _drawStripes(ctx, canvas, size) {
    for (let x = 0; x < canvas.width; x += size) {
      ctx.fillRect(x, 0, size / 2, canvas.height);
    }
  }

  _drawChecker(ctx, canvas, size) {
    for (let x = 0; x < canvas.width; x += size) {
      for (let y = 0; y < canvas.height; y += size) {
        if ((Math.floor(x / size) + Math.floor(y / size)) % 2 === 0) {
          ctx.fillRect(x, y, size, size);
        }
      }
    }
  }

  _drawDiagonal(ctx, canvas, size) {
    ctx.lineWidth = size / 4;
    for (let x = -canvas.height; x < canvas.width + canvas.height; x += size) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + canvas.height, canvas.height);
      ctx.stroke();
    }
  }

  _drawZigzag(ctx, canvas, size) {
    ctx.lineWidth = 2;
    for (let y = 0; y < canvas.height; y += size * 2) {
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += size) {
        const yOffset = (x / size) % 2 === 0 ? y : y + size;
        if (x === 0) ctx.moveTo(x, yOffset);
        else ctx.lineTo(x, yOffset);
      }
      ctx.stroke();
    }
  }

  _drawWave(ctx, canvas, size) {
    ctx.lineWidth = 2;
    for (let y = 0; y < canvas.height; y += size * 3) {
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const yOffset = y + Math.sin(x / size * Math.PI) * size;
        if (x === 0) ctx.moveTo(x, yOffset);
        else ctx.lineTo(x, yOffset);
      }
      ctx.stroke();
    }
  }

  _drawHearts(ctx, canvas, size) {
    for (let x = 0; x < canvas.width; x += size * 3) {
      for (let y = 0; y < canvas.height; y += size * 3) {
        this._drawHeart(ctx, x + size, y + size, size / 2);
      }
    }
  }

  _drawHeart(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.quadraticCurveTo(x, y, x + size / 4, y);
    ctx.quadraticCurveTo(x + size / 2, y, x + size / 2, y + size / 4);
    ctx.quadraticCurveTo(x + size / 2, y, x + size * 3 / 4, y);
    ctx.quadraticCurveTo(x + size, y, x + size, y + size / 4);
    ctx.quadraticCurveTo(x + size, y + size / 2, x + size / 2, y + size * 3 / 4);
    ctx.quadraticCurveTo(x, y + size / 2, x, y + size / 4);
    ctx.fill();
  }

  _drawStars(ctx, canvas, size) {
    for (let x = 0; x < canvas.width; x += size * 3) {
      for (let y = 0; y < canvas.height; y += size * 3) {
        this._drawStar(ctx, x + size, y + size, 5, size / 2, size / 4);
      }
    }
  }

  _drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  /**
   * Handle window resize for pattern canvas
   */
  handleResize() {
    if (this.patternCanvas) {
      this.patternCanvas.width = window.innerWidth;
      this.patternCanvas.height = window.innerHeight;
    }
  }
}
