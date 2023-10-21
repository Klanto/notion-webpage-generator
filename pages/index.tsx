import * as React from 'react'

import { NotionPage } from '@/components/NotionPage'
import { api, apiHost, domain } from '@/lib/config'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import { useState, useEffect } from 'react';

// export const getStaticProps = async () => {
//   try {
//     const props = await resolveNotionPage(domain)

//     return { props, revalidate: 10 }
//   } catch (err) {
//     console.error('page error', domain, err)

//     // we don't want to publish the error version of this page, so
//     // let next.js know explicitly that incremental SSG failed
//     throw err
//   }
// }

// export default function NotionDomainPage(props) {
//   return <NotionPage {...props} />
// }


export default function PageId() {
  const [mounted, setMounted] = useState(false);
  const [pageid, setPageId] = useState(() => {
    return typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pageid');
  });

  const [props, setProps] = useState(null);
  useEffect(() => {
    setMounted(true);
    async function fetchData() {
      const res = await fetch(`${apiHost}${api.getNotionPageProps}`, {
        method: 'POST',
        body: JSON.stringify({
          pageId: pageid
        }),
        headers: {
          'content-type': 'application/json'
        }
      }).then((response) => response.json())
        .then((data) => {
          setProps({props: data});
        })
        .catch((err) => {
          // console.log(err)
        })
    }
    fetchData();
  }, []);
  if (!props) return <></>;
  // const mapPageUrl = defaultMapPageUrl("067dd719a912471ea9a3ac10710e7fdf");
  return <NotionPage suppressHydrationWarning={true}  {...props} />
}
