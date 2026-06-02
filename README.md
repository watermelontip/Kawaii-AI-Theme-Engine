# ✨ Kawaii AI Theme Engine

一个基于随机化的 AI 卡哇伊风格页面主题美化引擎。每次运行都会生成独一无二的可爱风格主题！

## 🌟 特性

- 🎲 **完全随机化** - 每次生成都不同，无限主题可能
- 🎨 **卡哇伊风格** - 专为可爱、甜美的页面设计
- 🧩 **插件系统** - 支持自定义预设和扩展
- 🎯 **CSS 变量驱动** - 轻量级，高性能
- 🖼️ **动态图案** - 自动生成背景图案（波点、条纹、爱心等）
- 📱 **响应式** - 适配各种屏幕尺寸
- 🚀 **零依赖** - 纯原生 JavaScript，无需任何框架

## 📦 项目结构

```
Kawaii-AI-Theme-Engine/
├── index.html              # 演示页面
├── package.json
├── README.md
├── .gitignore
├── core/
│   ├── kawaii-engine.js    # 主引擎 - 协调所有组件
│   ├── style-engine.js     # 样式引擎 - CSS 变量和图案
│   └── utils.js            # 工具类 - Randomizer 等
└── plugins/
    ├── classic-kawaii.js   # 经典可爱风格预设
    └── custom-blend.js     # 自定义混合风格生成器
```

## 🚀 快速开始

### 方式一：直接打开

```bash
# 克隆项目
git clone <your-repo-url>
cd Kawaii-AI-Theme-Engine

# 直接在浏览器中打开 index.html
# 或者使用本地服务器（推荐）
npx serve .
```

### 方式二：作为模块使用

```javascript
import { KawaiiEngine } from './core/kawaii-engine.js';
import { classicKawaii } from './plugins/classic-kawaii.js';

// 创建引擎实例
const engine = new KawaiiEngine();

// 注册预设
engine.registerPreset('classic', classicKawaii);

// 应用经典可爱风格
engine.applyPreset('classic');

// 或者生成随机主题
engine.randomize();
```

## 🎨 使用方法

### 生成随机主题

```javascript
const engine = new KawaiiEngine();
const config = engine.randomize();
console.log(config); // 返回完整的主题配置
```

### 使用预设

```javascript
// 经典可爱风格
engine.applyPreset('classic');

// 自定义混合风格
engine.applyPreset('custom');
```

### 基于颜色生成主题

```javascript
import { fromHex } from './plugins/custom-blend.js';

const engine = new KawaiiEngine();
const config = fromHex(engine.rng, '#ff69b4');
engine.applyTheme(config);
```

### 自定义混合风格

```javascript
import { customBlend } from './plugins/custom-blend.js';

const config = customBlend(engine.rng, {
  baseHue: 300,        // 紫色系
  style: 'cute',       // 可爱风格
  darkMode: false,     // 亮色模式
  patternIntensity: 3, // 图案强度 1-5
});
engine.applyTheme(config);
```

### 导出 CSS

```javascript
const css = engine.exportCSS();
console.log(css);
// 输出:
// :root {
//   --kawaii-color-primary: hsl(330, 80%, 70%);
//   ...
// }
```

## 🎯 可用的 CSS 变量

引擎会自动生成以下 CSS 变量：

### 颜色
- `--kawaii-color-primary` - 主色调
- `--kawaii-color-secondary` - 辅助色
- `--kawaii-color-background` - 背景色
- `--kawaii-color-surface` - 卡片/表面色
- `--kawaii-color-text` - 主要文字色
- `--kawaii-color-text-secondary` - 次要文字色
- `--kawaii-color-border` - 边框色
- `--kawaii-color-shadow` - 阴影色

### 渐变
- `--kawaii-gradient-primary` - 主渐变
- `--kawaii-gradient-accent` - 强调渐变
- `--kawaii-gradient-background` - 背景渐变

### 排版
- `--kawaii-font-family` - 正文字体
- `--kawaii-font-heading-family` - 标题字体
- `--kawaii-font-size-base` - 基础字号
- `--kawaii-font-size-heading` - 标题字号
- `--kawaii-font-line-height` - 行高

### 装饰
- `--kawaii-deco-border-radius` - 圆角
- `--kawaii-deco-border` - 边框样式
- `--kawaii-deco-shadow` - 阴影
- `--kawaii-deco-emoji` - 主装饰 emoji
- `--kawaii-deco-emoji-secondary` - 次装饰 emoji

### 动画
- `--kawaii-anim-speed` - 动画速度
- `--kawaii-anim-bounce` - 弹跳曲线
- `--kawaii-anim-scale-hover` - 悬停缩放
- `--kawaii-anim-rotate-hover` - 悬停旋转

## 🔌 创建自定义插件

```javascript
/**
 * 自定义插件示例
 * @param {Randomizer} rng - 随机数生成器
 * @returns {Object} 主题配置
 */
export function myCustomTheme(rng) {
  return {
    colors: {
      'primary': rng.randomColor(0, 60, 80, 100, 60, 80), // 暖色调
      // ... 其他颜色
    },
    // ... 其他配置
  };
}

// 注册插件
engine.registerPreset('my-theme', myCustomTheme);
engine.applyPreset('my-theme');
```

## 🛠️ 开发

```bash
# 安装依赖（可选，仅用于本地服务器）
npm install

# 启动开发服务器
npm start
```

## 📄 许可证

MIT License

## 🌸 贡献

欢迎提交 Issue 和 Pull Request！

---

✨ 让每个页面都充满可爱的随机惊喜！✨
