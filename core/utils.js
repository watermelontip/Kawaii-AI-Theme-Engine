/**
 * Kawaii AI Theme Engine - Utilities
 * Contains the Randomizer class and helper functions
 */

/**
 * The core Randomizer class for generating random kawaii theme variations
 */
export class Randomizer {
  /**
   * @param {string} [seed] - Optional seed for reproducible randomness
   */
  constructor(seed = null) {
    this.seed = seed;
    this.state = this._hashSeed(seed || Math.random().toString());
  }

  /**
   * Simple hash function for seed generation
   * @param {string} str
   * @returns {number}
   * @private
   */
  _hashSeed(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  /**
   * Seeded random number generator (Mulberry32)
   * @returns {number} Random number between 0 and 1
   */
  random() {
    let t = this.state += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }

  /**
   * Generate a random integer between min and max (inclusive)
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  randInt(min, max) {
    return Math.floor(this.random() * (max - min + 1)) + min;
  }

  /**
   * Pick a random item from an array
   * @param {Array} arr
   * @returns {*}
   */
  pick(arr) {
    return arr[this.randInt(0, arr.length - 1)];
  }

  /**
   * Shuffle an array
   * @param {Array} arr
   * @returns {Array}
   */
  shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = this.randInt(0, i);
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  /**
   * Generate a random HSL color
   * @param {number} [minH=0] - Min hue
   * @param {number} [maxH=360] - Max hue
   * @param {number} [minS=50] - Min saturation
   * @param {number} [maxS=100] - Max saturation
   * @param {number} [minL=50] - Min lightness
   * @param {number} [maxL=85] - Max lightness
   * @returns {string} HSL color string
   */
  randomColor(minH = 0, maxH = 360, minS = 50, maxS = 100, minL = 50, maxL = 85) {
    const h = this.randInt(minH, maxH);
    const s = this.randInt(minS, maxS);
    const l = this.randInt(minL, maxL);
    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  /**
   * Generate a random hex color
   * @param {number} [minH=0]
   * @param {number} [maxH=360]
   * @returns {string} Hex color string
   */
  randomHexColor(minH = 0, maxH = 360) {
    const h = this.randInt(minH, maxH);
    const s = this.randInt(60, 100);
    const l = this.randInt(50, 80);
    return this.hslToHex(h, s, l);
  }

  /**
   * Convert HSL to Hex
   * @param {number} h
   * @param {number} s
   * @param {number} l
   * @returns {string}
   */
  hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
}

/**
 * Kawaii emoji and symbol presets
 */
export const KAWAII_EMOJIS = [
  '✨', '💖', '🌟', '🎀', '🌸', '💫', '⭐', '💝',
  '🌈', '🦋', '🍡', '🍰', '🫧', '💎', '🔮', '🎠',
  '🎪', '🎡', '🍬', '🧁', '🎀', '🩷', '💜', '💙',
  '🩵', '💚', '💛', '🧡', '❤️', '🖤', '🤍', '🤎'
];

/**
 * Kawaii pattern types
 */
export const PATTERNS = [
  'polka-dot',
  'stripe',
  'checker',
  'diagonal',
  'zigzag',
  'wave',
  'heart',
  'star'
];

/**
 * Font style presets
 */
export const FONT_STYLES = [
  { family: 'Rounded', weight: '700', style: 'normal' },
  { family: 'Cursive', weight: '400', style: 'italic' },
  { family: 'Fantasy', weight: '700', style: 'normal' },
  { family: 'Comic Sans MS', weight: '400', style: 'normal' }
];

/**
 * Generate a random gradient
 * @param {Randomizer} rng
 * @param {string} [direction='135deg']
 * @returns {string}
 */
export function randomGradient(rng, direction = '135deg') {
  const color1 = rng.randomColor();
  const color2 = rng.randomColor();
  return `linear-gradient(${direction}, ${color1}, ${color2})`;
}

/**
 * Generate a random kawaii border style
 * @param {Randomizer} rng
 * @returns {string}
 */
export function randomBorderStyle(rng) {
  const width = rng.randInt(2, 6);
  const style = rng.pick(['solid', 'dashed', 'dotted', 'double']);
  const color = rng.randomColor();
  return `${width}px ${style} ${color}`;
}

/**
 * Generate a random shadow
 * @param {Randomizer} rng
 * @returns {string}
 */
export function randomShadow(rng) {
  const x = rng.randInt(0, 10);
  const y = rng.randInt(0, 10);
  const blur = rng.randInt(5, 20);
  const spread = rng.randInt(0, 5);
  const color = rng.randomColor(0, 360, 30, 80, 20, 50);
  return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
}

/**
 * Generate a random border radius
 * @param {Randomizer} rng
 * @returns {string}
 */
export function randomBorderRadius(rng) {
  const presets = [
    '0', '4px', '8px', '12px', '16px', '24px', '32px',
    '50%', '10px 30px', '20px 5px 20px 5px',
    '30% 70% 70% 30% / 30% 30% 70% 70%'
  ];
  return rng.pick(presets);
}
