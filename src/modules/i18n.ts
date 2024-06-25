import { createI18n, type Locale } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {}
  // globalInjection: true,
  // silenceTranslationWarn: true,
  // missingWarn: false,
  // silenceFallbackWarn: true,
  // fallbackWarn: false
})
const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../locales/*.json')).map(([path, loadLocale]) => [
    path.match(/([\w-]*)\.json$/)?.[1],
    loadLocale
  ])
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

//思路一：过滤部分不相关的.mjs的locales文件
//思路二：动态的匹配vite glob内容 -> 不太可能
//element-plus与vue-i18n整合
const elementPlusLocalesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../node_modules/element-plus/dist/locale/*.mjs')).map(
    ([path, loadLocale]) => [path.match(/([\w-]*)\.mjs$/)?.[1], loadLocale]
  )
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>
console.log('elementPlusLocalesMap', elementPlusLocalesMap)

export const availableLocales = Object.keys(localesMap)
//筛选element-plus中我们需要的语言，比如zh-CN,en
//1.loadsh pick
//2.for -> {}
//3.reduce
const filterEPLocales = availableLocales.reduce((acc, locale) => {
  if (availableLocales.includes(locale)) {
    acc[locale] = elementPlusLocalesMap[locale.toLowerCase()]
  }
  return acc
}, {}) as Record<Locale, () => Promise<{ default: Record<string, string> }>>
console.log('filterEPLocales', filterEPLocales)

const loadedLanguages: string[] = []

export function setI18nLanguage(locale: string) {
  if (typeof document !== 'undefined') {
    document.querySelector('html').setAttribute('lang', locale)
  }
}

export async function loadLocaleMessages(lang: string) {
  if (i18n.global.locale.value === lang || loadedLanguages.includes(lang)) {
    return setI18nLanguage(lang)
  }

  // load locale messages with dynamic import
  const messages = await localesMap[lang]()
  const messagesEP = await filterEPLocales[lang]()
  // set locale and locale message
  i18n.global.setLocaleMessage(lang, {
    ...messagesEP.default,
    ...messages.default
  })
  console.log('setLocaleMessage', messages.default, lang)
  loadedLanguages.push(lang)
  return setI18nLanguage(lang)
}

export default {
  install(app: App) {
    app.use(i18n)
    loadLocaleMessages('zh-CN')
  }
}
