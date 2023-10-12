import rawSiteConfig from '../site.config'
import { SiteConfig } from './site-config'
import { api, apiHost } from '@/lib/config'

if (!rawSiteConfig) {
  throw new Error(`Config error: invalid site.config.ts`)
}

// allow environment variables to override site.config.ts
let siteConfigOverrides: SiteConfig

try {
  if (process.env.NEXT_PUBLIC_SITE_CONFIG) {
    siteConfigOverrides = JSON.parse(process.env.NEXT_PUBLIC_SITE_CONFIG)
  }
} catch (err) {
  console.error('Invalid config "NEXT_PUBLIC_SITE_CONFIG" failed to parse')
  throw err
}

const fetchSiteConfig = () => {
  // await fetch('https://jiffy-public.s3.us-east-1.amazonaws.com/config.json', {
  //   method: 'GET'
  // }).then((response) => response.json())
  // .then((data) => {
  //   debugger;
  //   return data;
  // })
  const sanitizeResponse = (response) => {
    const cleanup = (str) => {
      return str.replaceAll("\r\n", " ").replaceAll("\"", "'");
    }
    Object.keys(response).forEach(function (k) {
      if (response[k] && typeof response[k] === 'object') {
        sanitizeResponse(response[k]);
        return;
      }
      response[k] = cleanup(response[k].toString())
    })
    return response;
  }
  const response = {
    "js": "<script>console.log(\"this is JS only section and it needs to go in the header\")</script>",
    "css": "p {\r\ncolor: red !important;\r\n}",
    "logo": "https://app.jiffy.so/static/images/jiffy.jpg",
    "pages": [
      {
        "notion_url": "https://klanto.notion.site/The-Mysterious-Spellbooks-137d4930bed548a0ad7065f91b3f4c44?pvs=4",
        "browser_url": "/",
        "notion_page_id": "137d4930bed548a0ad7065f91b3f4c44"
      },
      {
        "notion_url": "https://klanto.notion.site/The-Mysterious-Spellbooks-137d4930bed548a0ad7065f91b3f4c44?pvs=4",
        "browser_url": "/",
        "notion_page_id": "137d4930bed548a0ad7065f91b3f4c44"
      },
      {
        "notion_url": "https://klanto.notion.site/The-Mysterious-Spellbooks-137d4930bed548a0ad7065f91b3f4c44?pvs=4",
        "browser_url": "demo",
        "notion_page_id": "137d4930bed548a0ad7065f91b3f4c44"
      }
    ],
    "footer": "<script>console.log(\"this is custom javascript from the footer of the site config\")</script>",
    "header": "<meta name=\"description\" content=\"just head tag content\" />"
  }
  return sanitizeResponse(response);
}
const siteConfig: SiteConfig = {
  ...rawSiteConfig,
  ...siteConfigOverrides,
  ...fetchSiteConfig()
}

export function getSiteConfig<T>(key: string, defaultValue?: T): T {
  console.log("site config", siteConfig)
  let value = siteConfig[key]

  if (value !== undefined) {
    return value
  }

  if (defaultValue !== undefined) {
    return defaultValue
  }

  throw new Error(`Config error: missing required site config value "${key}"`)
}

export function getEnv(
  key: string,
  defaultValue?: string,
  env = process.env
): string {
  const value = env[key]

  if (value !== undefined) {
    return value
  }

  if (defaultValue !== undefined) {
    return defaultValue
  }

  throw new Error(`Config error: missing required env variable "${key}"`)
}
