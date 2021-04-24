import { Request, Response } from "express";
import { getArticles } from "../models/Articles";
import { ArticlesConst } from "../models/constant";

export default class ArticlesController {
  constructor() {}

  doGetArticles = async (req: Request, res: Response) => {
    const qiitaUserName = req.query.qiitaUserName as string;
    const noteUserName = req.query.noteUserName as string;

    if (qiitaUserName === undefined && noteUserName === undefined) {
      const response = {
        errors: {
          type: "no_parameters",
          message: "At least one prameter is required",
        },
      };
      return res.status(400).json(response);
    }

    const paramsMap = new Map([
      [ArticlesConst.QIITA_USER_NAME, qiitaUserName],
      [ArticlesConst.NOTE_USER_NAME, noteUserName],
    ]);

    const resJson = await getArticles(paramsMap);

    return res.json(resJson);
  };
}
