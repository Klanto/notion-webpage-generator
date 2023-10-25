import { NextApiRequest, NextApiResponse } from 'next'
import { domain, } from '@/lib/config'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import { getSiteMap } from '@/lib/get-site-map';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).send({ error: 'method not allowed here' })
  }
  type queryParam = {
    pageid?: string | undefined, 
  }
  const {pageid = undefined}: queryParam = req.query
  const props = await getSiteMap(pageid)
  return res.status(200).json(props.canonicalPageMap);
}