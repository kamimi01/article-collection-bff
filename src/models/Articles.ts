import { ArticlesConst } from "./constant";

const webclient = require("request");

export const getArticles = (params: Map<string, string>) => {
  const qiitaUserName = params.get(ArticlesConst.QIITA_USER_NAME);
  const noteUserName = params.get(ArticlesConst.NOTE_USER_NAME);

  // let response;

  // QiitaのAPIを叩く
  const qiitaBaseApi =
    "https://qiita.com/api/v2/users/" + qiitaUserName + "/items";

  webclient.get(
    {
      url: qiitaBaseApi,
      qs: {
        qiitaUserName: qiitaUserName,
        noteUserName: noteUserName,
      },
    },
    function (error: Error, response: Response, body: Body) {
      // console.log(response.user);
      console.log(typeof response, typeof error, typeof body);
    }
  );

  const resJson = {
    articleContents: [
      {
        service: "qiita",
        title:
          "色んな人向けにバーチャルSNS - cluster - に関するリンクを広く浅くまとめてみた",
        userName: "kamimi01",
        numOfGood: 1,
        profileImageUrl:
          "https://avatars1.githubusercontent.com/u/47489629?v=4",
        url: "https://qiita.com/kamimi01/items/353ed9502ed62cbe9864",
        createdDate: "2020-12-24T12:06:44+09:00",
      },
    ],
  };

  return resJson;
};
