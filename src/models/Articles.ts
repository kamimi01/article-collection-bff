const fetch = require("node-fetch");
import { ArticlesConst } from "./constant";

export const getArticles = async (params: Map<string, string>) => {
  const userName = params.get(ArticlesConst.USER_NAME);

  // QiitaのAPIを叩く
  const qiitaBaseApi =
    "https://qiita.com/api/v2/users/" + userName + "/items";

  const response = await fetch(qiitaBaseApi);
  const json = await response.json();

  interface qiitaResponse {
    title: string,
    user: {
      id: string,
      profile_image_url: string
    },
    likes_count: number,
    url: string,
    created_at: string
  }

  interface apiResponse {
    service: string,
    title: string,
    userName: string,
    numOfGood: number,
    profileImageUrl: string,
    url: string,
    createdDate: string,
  }

  // console.log(json[0].title)

  let articleContentsArray: [apiResponse] = [{
    service: "",
    title: "",
    userName: "",
    numOfGood: 0,
    profileImageUrl: "",
    url: "",
    createdDate: "",
  }]

  json.forEach((value: qiitaResponse, index: number) => {
    const response: apiResponse = {
      service: "qiita",
      title: value.title,
      userName: value.user.id,
      numOfGood: value.likes_count,
      profileImageUrl: value.user.profile_image_url,
      url: value.url,
      createdDate: value.created_at,
    }
    if (index === 1) {
      articleContentsArray = [response]
    } else {
      articleContentsArray.push(response)
    }
  });

  // console.log(articleContentsArray)

  const resJson = {
    articleContents: articleContentsArray
  };

  return resJson
};
