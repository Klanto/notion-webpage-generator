import * as React from 'react'
import { GetStaticProps } from 'next'

import { NotionPage } from '@/components/NotionPage'
import { api, apiHost, isDev } from '@/lib/config'
import { getSiteMap } from '@/lib/get-site-map'
import { PageProps, Params } from '@/lib/types'

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  context
) => {
  const rawPageId = context.params.pageId as string

  const res = await fetch(`${apiHost}${api.getNotionPageProps}`, {
    method: 'POST',
    body: JSON.stringify({
      pageId: rawPageId
    }),
    headers: {
      'content-type': 'application/json'
    }
  }).then((response) => response.json())
    .then((data) => {
      // setProps(data);
      return data;
    })
    .catch((err) => {
      return {}
    })
  return { props: res };
}

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: 'blocking'
    }
  }

  const siteMap = await getSiteMap()

  const staticPaths = {
    paths: Object.keys(siteMap.canonicalPageMap).map((pageId) => ({
      params: {
        pageId
      }
    })),
    // paths: [],
    fallback: false
  }

  // console.log(staticPaths.paths)
  return staticPaths
}

export default function NotionDomainDynamicPage(props) {
  return <NotionPage {...props} />
}
