import { NextApiRequest, NextApiResponse } from 'next'
import { domain, inversePageUrlOverrides, pageUrlOverrides, } from '@/lib/config'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import { siteConfig } from '../../lib/get-config-value'
import { parsePageId } from 'notion-utils'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'method not allowed here' })
  }
  const { pageId } = req.body;

  const id = process.env.NEXT_PUBLIC_WEBSITE_ID;
  // const props = await resolveNotionPage(domain, pageId)
  let cleanPageId = parsePageId(pageId, { uuid: false })
  if(!cleanPageId) {
    cleanPageId = pageUrlOverrides[pageId]
  }
  let props = await fetch(`https://app.jiffy.so/site/setting/open/${id}?pageId=${cleanPageId}`, {
        method: 'GET',
      }).then((response) => {
        return response.json()
      })
        .then((data) => {
          return null;
        })
        .catch(async (err) => {
          return null;
        })
  if(!props) {
    props = await resolveNotionPage(domain, cleanPageId);
  }
  props = {
    ...props,
    site: siteConfig,
    pageId: pageId
  }
  return res.status(200).json(props);
}