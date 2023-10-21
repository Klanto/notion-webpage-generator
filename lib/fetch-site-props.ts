import { GlobalProps } from "./types";

export async function fetchSiteProps(): Promise<GlobalProps> {
    console.log("sdfdsfsd", process.env.WEBSITE_ID)
    const res = await fetch(`https://app.jiffy.so/site/setting/open/${process.env.WEBSITE_ID}`, {
        method: 'GET',
      }).then((response) => response.json())
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err)
          return { notFound: true, }
        })
    return {
        ...res
    }
}