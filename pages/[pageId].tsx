import * as React from 'react'
import { GetServerSideProps, GetStaticProps } from 'next'

import { NotionPage } from '@/components/NotionPage'
import { api, apiHost, domain, isDev } from '@/lib/config'
import { getSiteMap } from '@/lib/get-site-map'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import { PageProps, Params } from '@/lib/types'
import { defaultMapPageUrl } from 'react-notion-x'

import { fetchSiteProps } from '@/lib/fetch-site-props';
import { useEffect, useState } from 'react'

// export const getStaticProps: GetStaticProps<PageProps, Params> = async (
//   context
// ) => {
//   const rawPageId = context.params.pageId as string
//   const siteProps = await fetchSiteProps();
//   console.log("===============")
//   console.log("dfgdfg", siteProps)
//   console.log("===============")

//   const res = await fetch(`${apiHost}${api.getNotionPageProps}`, {
//     method: 'POST',
//     body: JSON.stringify({
//       pageId: rawPageId
//     }),
//     headers: {
//       'content-type': 'application/json'
//     }
//   }).then((response) => response.json())
//     .then((data) => {
//       // setProps(data);
//       return data;
//     })
//     .catch((err) => {
//       return {}
//     })
//  return  { props: {...res, siteProps} };
// }

// export async function getStaticPaths() {
//   if (isDev) {
//     return {
//       paths: [],
//       fallback: 'blocking'
//     }
//   }

//   const siteMap = await getSiteMap()

//   const staticPaths = {
//     paths: Object.keys(siteMap.canonicalPageMap).map((pageId) => ({
//       params: {
//         pageId
//       }
//     })),
//     // paths: [],
//     fallback: false
//   }

//   // console.log(staticPaths.paths)
//   return staticPaths
// }

// export async function getServerSideProps(context) {
// export const getServerSideProps = async (
//   context
// ) => {
//   // Fetch data from external API
//   // const res = await fetch(`https://.../data`)
//   // const data = await res.json()

//   const { pageid } = context.query;
// console.log("dsfdsfsd", pageid, context.params.pageId)
//   const res = await fetch(`${apiHost}${api.getNotionPageProps}`, {
//     method: 'POST',
//     body: JSON.stringify({
//       pageId: pageid
//     }),
//     headers: {
//       'content-type': 'application/json'
//     }
//   }).then((response) => response.json())
//     .then((data) => {
//       // setProps(data);
//       return { props: data }
//     })
//     .catch((err) => {
//       return {}
//     })
//  return res;
//   // Pass data to the page via props
  
// }


// export const getServerSideProps = (async (context) => {
//   const rawPageId = context.params.pageId as string

//   const siteProps = await fetchSiteProps();
//   console.log("===============")
//   console.log("dfgdfg", siteProps)
//   console.log("===============")
//   const res = await fetch(`${apiHost}${api.getNotionPageProps}`, {
//     method: 'POST',
//     body: JSON.stringify({
//       pageId: rawPageId
//     }),
//     headers: {
//       'content-type': 'application/json'
//     }
//   }).then((response) => response.json())
//     .then((data) => {
//       return data;
//     })
//     .catch((err) => {
//       console.log(err)
//       return { notFound: true, }
//     })
//  return  { props: {...res} };
// });

export default async function PageId() {
  const [mounted, setMounted] = useState(false);
  const [pageid, setPageId] = useState(() => {
    return typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pageid');
  });

  const siteProps = await fetchSiteProps()
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
          setProps(data);
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
