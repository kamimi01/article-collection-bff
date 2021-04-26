import { Request, Response } from "express";
import { getArticles } from "../models/Articles";
import { ArticlesConst } from "../models/constant";

export default class ArticlesController {
  constructor() {}

  doGetArticles = async (req: Request, res: Response) => {
    const userName = req.query.userName as string;

    if (userName === undefined) {
      const response = {
        message: "At least one prameter is required",
        type: "no_parameters",
      };
      return res.status(400).json(response);
    }

    const paramsMap = new Map([[ArticlesConst.USER_NAME, userName]]);

    const resJson = await getArticles(paramsMap);

    return res.json(resJson);
  };
}
