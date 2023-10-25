import * as React from 'react'

import { NotionPage } from '@/components/NotionPage'
import { api, apiHost } from '@/lib/config'
import { defaultMapPageUrl } from 'react-notion-x'
import { getSiteConfig } from '@/lib/get-config-value'

export const getServerSideProps = (async (context) => {
  const rawPageId = context.params.pageId as string

  const mapPageUrl = defaultMapPageUrl(getSiteConfig('rootNotionPageId'));
  console.log("mapPageUrl =>", mapPageUrl(rawPageId));

  console.log("rawPageId", rawPageId);
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
      return data;
    })
    .catch((err) => {
      console.log(err)
      return { notFound: true, }
    })
 return  { props: res };
});

export default function PageId(props) {
  return <NotionPage {...props} />
}
