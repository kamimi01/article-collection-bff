// import { fetch } from "node-fetch"
const fetch = require("node-fetch")
import * as ArticlesConst from "./constant"

interface qiitaResponse {
  id: string
  title: string
  user: {
    id: string
    profile_image_url: string
  }
  likes_count: number
  url: string
  created_at: string
}

interface apiArticleContentsResponse {
  id: string
  service: string
  title: string
  userName: string
  likesCount: number
  profileImageUrl: string
  url: string
  createdDate: string
}

// console.log(json[0].title)

let articleContentsArray: [apiArticleContentsResponse] = [
  {
    id: "",
    service: "",
    title: "",
    userName: "",
    likesCount: 0,
    profileImageUrl: "",
    url: "",
    createdDate: "",
  },
]

const articleContentJson = {
  articleContents: articleContentsArray,
}

export const getArticles = async (params: Map<string, string>) => {
  // レスポンスの型
  const fetchResult = { result: false, resJson: articleContentJson }

  const userName = params.get(ArticlesConst.USER_NAME)

  // QiitaのAPIを叩く
  const qiitaBaseApi = "https://qiita.com/api/v2/users/" + userName + "/items"

  const response = await fetch(qiitaBaseApi)
  const json = await response.json()

  const statusForQiita = response.status
  const isSuccessForQiita = statusForQiita >= 200 && statusForQiita < 300

  // ステータスが200台ではない、または200だがJSONの中身が空の場合
  if (!isSuccessForQiita || json.length === 0) {
    return fetchResult
  }

  json.forEach((value: qiitaResponse, index: number) => {
    const response: apiArticleContentsResponse = {
      id: value.id,
      service: "qiita",
      title: value.title,
      userName: value.user.id,
      likesCount: value.likes_count,
      profileImageUrl: value.user.profile_image_url,
      url: value.url,
      createdDate: value.created_at,
    }
    if (index === 1) {
      articleContentsArray = [response]
    } else {
      articleContentsArray.push(response)
    }
  })

  const resJson = {
    articleContents: articleContentsArray,
  }

  fetchResult["result"] = true
  fetchResult["resJson"] = resJson

  return fetchResult
}
