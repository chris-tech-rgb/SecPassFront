import defaultSettings from '@/settings'

const title = defaultSettings.title || 'SecPass'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
