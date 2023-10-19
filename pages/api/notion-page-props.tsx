import { NextApiRequest, NextApiResponse } from 'next'
import { domain, } from '@/lib/config'
import { resolveNotionPage } from '@/lib/resolve-notion-page'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'method not allowed here' })
  }
  const { pageId } = req.body;

  const props = await resolveNotionPage(domain, pageId)
  return res.status(200).json(props);
}