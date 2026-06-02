/**
 * Kawaii AI Theme Engine - Classic Kawaii Plugin
 * The default kawaii theme with soft pastels and playful elements
 */

/**
 * Classic kawaii theme generator
 * @param {import('../core/utils.js').Randomizer} rng - Randomizer instance
 * @returns {Object} Theme configuration
 */
export function classicKawaii(rng) {
  // Classic kawaii uses soft pastel colors
  const pastelPalettes = [
    // Pink theme
    { primary: [330, 350], secondary: [280, 320], bg: [330, 350] },
    // Purple theme
    { primary: [270, 300], secondary: [310, 340], bg: [270, 300] },
    // Blue theme
    { primary: [200, 230], secondary: [170, 200], bg: [200, 230] },
    // Mint theme
    { primary: [150, 180], secondary: [120, 150], bg: [150, 180] },
    // Peach theme
    { primary: [10, 30], secondary: [340, 360], bg: [10, 30] },
  ];

  const palette = rng.pick(pastelPalettes);

  return {
    colors: {
      'primary': rng.randomColor(palette.primary[0], palette.primary[1], 70, 100, 65, 80),
      'secondary': rng.randomColor(palette.secondary[0], palette.secondary[1], 60, 90, 60, 75),
      'background': rng.randomColor(palette.bg[0], palette.bg[1], 15, 35, 92, 98),
      'surface': rng.randomColor(palette.bg[0], palette.bg[1], 10, 25, 95, 99),
      'text': rng.randomColor(palette.primary[0], palette.primary[1], 40, 70, 20, 35),
      'text-secondary': rng.randomColor(palette.primary[0], palette.primary[1], 20, 40, 45, 60),
      'border': rng.randomColor(palette.primary[0], palette.primary[1], 30, 60, 80, 92),
      'shadow': rng.randomColor(palette.primary[0], palette.primary[1], 40, 70, 40, 60),
    },
    gradients: {
      'primary': `linear-gradient(${rng.randInt(120, 160)}deg, ${rng.randomColor(palette.primary[0], palette.primary[1], 70, 100, 70, 85)}, ${rng.randomColor(palette.secondary[0], palette.secondary[1], 70, 100, 70, 85)})`,
      'accent': `linear-gradient(${rng.randInt(30, 60)}deg, ${rng.randomColor(palette.primary[0], palette.primary[1], 80, 100, 60, 75)}, ${rng.randomColor(palette.secondary[0], palette.secondary[1], 80, 100, 60, 75)})`,
      'background': `linear-gradient(180deg, ${rng.randomColor(palette.bg[0], palette.bg[1], 10, 20, 95, 99)}, ${rng.randomColor(palette.bg[0], palette.bg[1], 15, 30, 90, 97)})`,
    },
    patterns: {
      type: rng.pick(['polka-dot', 'heart', 'star', 'wave']),
      color: rng.randomColor(palette.primary[0], palette.primary[1], 50, 80, 75, 90),
      size: `${rng.randInt(20, 35)}px`,
      opacity: (rng.randInt(8, 20) / 100).toFixed(2),
    },
    typography: {
      'family': "'Nunito', 'Quicksand', sans-serif",
      'heading-family': "'Fredoka One', 'Baloo 2', cursive",
      'size-base': `${rng.randInt(15, 17)}px`,
      'size-heading': `${rng.randInt(28, 40)}px`,
      'line-height': (rng.randInt(160, 190) / 100).toFixed(2),
    },
    decorations: {
      'border-radius': rng.pick(['12px', '16px', '20px', '24px', '30px']),
      'border': `${rng.randInt(2, 4)}px solid ${rng.randomColor(palette.primary[0], palette.primary[1], 50, 80, 80, 92)}`,
      'shadow': `0 ${rng.randInt(4, 8)}px ${rng.randInt(12, 24)}px ${rng.randomColor(palette.primary[0], palette.primary[1], 30, 60, 40, 60)}`,
      'emoji': rng.pick(['✨', '💖', '🌸', '🎀', '🌟', '💫', '🩷', '🧁']),
      'emoji-secondary': rng.pick(['🌈', '🦋', '🍡', '🍬', '🫧', '💎', '🔮', '🎠']),
    },
    animations: {
      'speed': `${rng.randInt(300, 500)}ms`,
      'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      'scale-hover': (1 + rng.randInt(3, 8) / 100).toFixed(3),
      'rotate-hover': `${rng.randInt(-5, 5)}deg`,
    },
  };
}

/**
 * Plugin metadata
 */
export const pluginInfo = {
  name: 'Classic Kawaii',
  version: '1.0.0',
  description: 'Default kawaii theme with soft pastels and playful elements',
  author: 'Kawaii AI Theme Engine',
};
