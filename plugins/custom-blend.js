/**
 * Kawaii AI Theme Engine - Custom Blend Plugin
 * A highly customizable theme generator with blend modes and advanced options
 */

/**
 * Custom blend theme generator
 * @param {import('../core/utils.js').Randomizer} rng - Randomizer instance
 * @param {Object} [options] - Customization options
 * @param {string} [options.baseHue] - Base hue (0-360)
 * @param {string} [options.style] - Style preset: 'cute', 'cool', 'warm', 'neon', 'pastel'
 * @param {boolean} [options.darkMode] - Generate dark mode theme
 * @param {number} [options.patternIntensity] - Pattern intensity (1-5)
 * @returns {Object} Theme configuration
 */
export function customBlend(rng, options = {}) {
  const {
    baseHue = rng.randInt(0, 360),
    style = rng.pick(['cute', 'cool', 'warm', 'neon', 'pastel']),
    darkMode = rng.random() > 0.5,
    patternIntensity = rng.randInt(1, 5),
  } = options;

  // Style configurations
  const styleConfigs = {
    cute: {
      hueRange: 20,
      saturation: [70, 100],
      lightness: [60, 80],
      patterns: ['polka-dot', 'heart', 'star'],
      borderRadii: ['16px', '20px', '24px', '30px', '50%'],
    },
    cool: {
      hueRange: 40,
      saturation: [50, 80],
      lightness: [50, 70],
      patterns: ['stripe', 'diagonal', 'zigzag'],
      borderRadii: ['8px', '12px', '16px', '4px 16px'],
    },
    warm: {
      hueRange: 30,
      saturation: [60, 90],
      lightness: [55, 75],
      patterns: ['wave', 'checker', 'diagonal'],
      borderRadii: ['12px', '16px', '20px', '30% 70%'],
    },
    neon: {
      hueRange: 60,
      saturation: [90, 100],
      lightness: [50, 65],
      patterns: ['zigzag', 'stripe', 'diagonal'],
      borderRadii: ['4px', '8px', '0', '4px 20px'],
    },
    pastel: {
      hueRange: 25,
      saturation: [40, 70],
      lightness: [75, 90],
      patterns: ['polka-dot', 'heart', 'wave'],
      borderRadii: ['20px', '24px', '30px', '50%'],
    },
  };

  const config = styleConfigs[style] || styleConfigs.cute;

  // Generate base colors
  const secondaryHue = (baseHue + rng.randInt(30, 90)) % 360;

  // Dark mode adjustments
  const bgLightness = darkMode ? rng.randInt(10, 20) : rng.randInt(92, 98);
  const surfaceLightness = darkMode ? rng.randInt(15, 25) : rng.randInt(95, 99);
  const textLightness = darkMode ? rng.randInt(85, 95) : rng.randInt(15, 35);
  const textSecLightness = darkMode ? rng.randInt(60, 75) : rng.randInt(40, 60);

  return {
    colors: {
      'primary': rng.randomColor(baseHue - config.hueRange / 2, baseHue + config.hueRange / 2, config.saturation[0], config.saturation[1], config.lightness[0], config.lightness[1]),
      'secondary': rng.randomColor(secondaryHue - config.hueRange / 2, secondaryHue + config.hueRange / 2, config.saturation[0], config.saturation[1], config.lightness[0], config.lightness[1]),
      'background': rng.randomColor(baseHue - 15, baseHue + 15, 10, 30, bgLightness - 3, bgLightness + 3),
      'surface': rng.randomColor(baseHue - 10, baseHue + 10, 5, 20, surfaceLightness - 2, surfaceLightness + 2),
      'text': rng.randomColor(baseHue - 20, baseHue + 20, 20, 50, textLightness - 5, textLightness + 5),
      'text-secondary': rng.randomColor(baseHue - 15, baseHue + 15, 10, 30, textSecLightness - 5, textSecLightness + 5),
      'border': rng.randomColor(baseHue - 10, baseHue + 10, 20, 50, darkMode ? 30 : 80, darkMode ? 40 : 92),
      'shadow': rng.randomColor(baseHue, baseHue, 30, 60, darkMode ? 5 : 30, darkMode ? 15 : 50),
    },
    gradients: {
      'primary': `linear-gradient(${rng.randInt(120, 160)}deg, ${rng.randomColor(baseHue, baseHue + 30, config.saturation[0], config.saturation[1], config.lightness[0], config.lightness[1])}, ${rng.randomColor(secondaryHue, secondaryHue + 30, config.saturation[0], config.saturation[1], config.lightness[0], config.lightness[1])})`,
      'accent': `linear-gradient(${rng.randInt(30, 60)}deg, ${rng.randomColor(baseHue - 20, baseHue + 20, config.saturation[0], config.saturation[1], config.lightness[0], config.lightness[1])}, ${rng.randomColor(secondaryHue - 20, secondaryHue + 20, config.saturation[0], config.saturation[1], config.lightness[0], config.lightness[1])})`,
      'background': `linear-gradient(180deg, ${rng.randomColor(baseHue - 10, baseHue + 10, 5, 15, bgLightness, bgLightness + 3)}, ${rng.randomColor(baseHue - 15, baseHue + 15, 10, 25, bgLightness - 3, bgLightness)})`,
    },
    patterns: {
      type: patternIntensity > 0 ? rng.pick(config.patterns) : 'none',
      color: rng.randomColor(baseHue, baseHue + 30, 40, 70, darkMode ? 20 : 70, darkMode ? 35 : 85),
      size: `${rng.randInt(15, 20 + patternIntensity * 5)}px`,
      opacity: (rng.randInt(3 + patternIntensity * 2, 10 + patternIntensity * 3) / 100).toFixed(2),
    },
    typography: {
      'family': style === 'neon'
        ? "'Space Grotesk', 'Inter', sans-serif"
        : style === 'cool'
          ? "'Inter', 'Poppins', sans-serif"
          : "'Nunito', 'Quicksand', sans-serif",
      'heading-family': style === 'neon'
        ? "'Orbitron', 'Space Grotesk', sans-serif"
        : style === 'cool'
          ? "'Montserrat', 'Poppins', sans-serif"
          : "'Fredoka One', 'Baloo 2', cursive",
      'size-base': `${rng.randInt(14, 17)}px`,
      'size-heading': `${rng.randInt(26, 44)}px`,
      'line-height': (rng.randInt(150, 190) / 100).toFixed(2),
    },
    decorations: {
      'border-radius': rng.pick(config.borderRadii),
      'border': `${rng.randInt(2, 4)}px ${rng.pick(['solid', 'dashed'])} ${rng.randomColor(baseHue, baseHue + 20, 40, 70, darkMode ? 30 : 75, darkMode ? 45 : 90)}`,
      'shadow': darkMode
        ? `0 ${rng.randInt(4, 8)}px ${rng.randInt(16, 32)}px rgba(0, 0, 0, 0.3)`
        : `0 ${rng.randInt(4, 8)}px ${rng.randInt(12, 24)}px ${rng.randomColor(baseHue, baseHue, 30, 60, 40, 60)}`,
      'emoji': rng.pick(darkMode
        ? ['🔮', '💜', '🌌', '💎', '🫧', '✨', '💫', '🌙']
        : ['✨', '💖', '🌸', '🎀', '🌟', '🌈', '🦋', '🧁']),
      'emoji-secondary': rng.pick(darkMode
        ? ['⚡', '🔥', '💫', '🪐', '🌠', '🎆', '🎇', '🧿']
        : ['🍬', '🍡', '🫧', '💎', '🎠', '🎪', '🎡', '💝']),
    },
    animations: {
      'speed': `${rng.randInt(style === 'neon' ? 150 : 300, style === 'neon' ? 350 : 600)}ms`,
      'bounce': style === 'neon'
        ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        : 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      'scale-hover': (1 + rng.randInt(style === 'neon' ? 1 : 3, style === 'neon' ? 5 : 10) / 100).toFixed(3),
      'rotate-hover': `${rng.randInt(style === 'neon' ? -3 : -8, style === 'neon' ? 3 : 8)}deg`,
    },
    meta: {
      style,
      darkMode,
      baseHue,
      patternIntensity,
    },
  };
}

/**
 * Generate a theme based on a color hex code
 * @param {import('../core/utils.js').Randomizer} rng - Randomizer instance
 * @param {string} hexColor - Hex color to base the theme on
 * @returns {Object} Theme configuration
 */
export function fromHex(rng, hexColor) {
  // Convert hex to HSL
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
    h = Math.round(h * 360);
  }

  s = Math.round(s * 100);
  const lRound = Math.round(l * 100);

  // Determine if it's a light or dark color
  const isDark = lRound < 50;

  return customBlend(rng, {
    baseHue: h,
    style: s > 70 ? 'neon' : s > 50 ? (lRound > 70 ? 'pastel' : 'cute') : 'cool',
    darkMode: isDark,
    patternIntensity: rng.randInt(1, 3),
  });
}

/**
 * Plugin metadata
 */
export const pluginInfo = {
  name: 'Custom Blend',
  version: '1.0.0',
  description: 'Highly customizable theme generator with style presets and color blending',
  author: 'Kawaii AI Theme Engine',
};
