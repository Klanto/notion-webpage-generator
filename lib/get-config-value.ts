import rawSiteConfig from '../site.config'
import { SiteConfig } from './site-config'
import { api, apiHost, site } from '@/lib/config'
import { fetchSiteProps } from '@/lib/fetch-site-props';
// var get = require('lodash/get');

const get = (object, path, defval = null) => {
  if (typeof path === "string") path = path.split(".");
  return path.reduce((xs, x) => (xs && xs[x] ? xs[x] : defval), object);
}

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

const fetchSiteConfig = async () => {
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
    // console.log(response)
    Object.keys(response).forEach(function (k) {
      if (response[k] && typeof response[k] === 'object') {
        sanitizeResponse(response[k]);
        return;
      }
     if(['boolean', 'undefined'].includes(typeof response[k])) {
      response[k] = cleanup(response[k].toString())
     }
    })
    // console.log(response)
    return response;
  }
  // const response = {
  //   "isBasicAccount": true,
  //   // "js": "<script>console.log(\"this is JS only section and it needs to go in the header\")</script>",
  //   // "css": "p {\r\ncolor: red !important;\r\n}",
  //   "logo": "https://app.jiffy.so/static/images/jiffy.jpg",
  //   "rootNotionPageId": 'ffbe166b-81a1-4edb-b7e1-65062b2307f9',
  //   // "rootNotionPageId": '61795be623be4fecb49b4e5dc643a46b',
  //   // "rootNotionPageId": 'eb036e2c9db54b6c9ba43a048efd3c9c',
  //   "navigationLinks": [
  //   ],
  //   "themename": "College1",
  //   // "colors": {
  //   //   "light": {
  //   //     "primary": "#0162DA"
  //   //   },
  //   //   "dark": {
  //   //     "primary": "#0162DA"
  //   //   },
  //   // },
  //   "font": {
  //     "name": "Open Sans",
  //     "link": "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700",
  //   },
  //   "footer": "<script>console.log(\"this is custom javascript from the footer of the site config\")</script>",
  //   "header": "<meta name=\"description\" content=\"just head tag content\" />",
  // }
  return sanitizeResponse(await fetchSiteProps());
}
const siteConfig: SiteConfig = {
  ...rawSiteConfig,
  ...siteConfigOverrides,
  ...fetchSiteConfig()
}

export function getSiteConfig<T>(key: string, defaultValue?: T): T {
  let value = siteConfig[key]
  if(key.split('.').length > 1) {
    value = get(siteConfig, key)
  }

  if (value !== undefined) {
    return value
  }

  if (defaultValue !== undefined) {
    return defaultValue
  }

  return undefined;
  // throw new Error(`Config error: missing required site config value "${key}"`)
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
