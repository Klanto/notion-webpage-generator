import { GlobalProps } from "./types";

export async function fetchSiteProps(): Promise<GlobalProps> {
    console.log("sdfdsfsd", process.env.WEBSITE_ID, process.env.NEXT_PUBLIC_WEBSITE_ID)
    const id = process.env.NEXT_PUBLIC_WEBSITE_ID;
    const res = await fetch(`https://app.jiffy.so/site/setting/open/${id}`, {
        method: 'GET',
      }).then((response) => response.json())
        .then((data) => {
          return data;
        })
        .catch((err) => {
          console.log(err)
          return { ...err, id  };
        })
    return {
        ...res
    }
}