import * as React from 'react'

import { NotionPage } from '@/components/NotionPage'
import { api, apiHost } from '@/lib/config'
import { defaultMapPageUrl } from 'react-notion-x'
import { getSiteConfig } from '@/lib/get-config-value'

// export const getStaticProps: GetStaticProps<PageProps, Params> = async (
//   context
// ) => {
//   const rawPageId = context.params.pageId as string

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
//  return  { props: res };
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
