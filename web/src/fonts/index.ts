import localFont from 'next/font/local'

/**
 * 自托管字体（next/font/local）。
 * 变量字重（variable woff2）来自 Fontsource，已随仓库提交到 src/fonts/，
 * 构建与运行均不依赖外网（Google Fonts），零布局抖动、自动子集与预加载。
 * 每个字体导出一个 CSS 变量，在 globals.css 的 @theme 中作为首选字体引用。
 */

export const fontSans = localFont({
  src: './Manrope-var.woff2',
  variable: '--font-manrope',
  weight: '400 700',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', '-apple-system', 'PingFang SC', 'Microsoft YaHei', 'sans-serif'],
})

export const fontDisplay = localFont({
  src: './Fraunces-var.woff2',
  variable: '--font-fraunces',
  weight: '400 600',
  display: 'swap',
  preload: true,
  fallback: ['Songti SC', 'STSong', 'SimSun', 'Georgia', 'serif'],
})

export const fontMono = localFont({
  src: './JetBrainsMono-var.woff2',
  variable: '--font-jetbrains',
  weight: '400 500',
  display: 'swap',
  preload: false,
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
})
