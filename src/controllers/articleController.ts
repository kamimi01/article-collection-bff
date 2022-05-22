import { Request, Response } from "express"
import { getArticles } from "../models/Articles"
import * as ArticlesConst from "../models/constant"

export default class ArticlesController {
  doGetArticles = async (req: Request, res: Response) => {
    const userName = req.query.userName as string

    if (userName === undefined) {
      const response = {
        message: "At least one prameter is required",
        type: "no_parameters",
      }
      return res.status(400).json(response)
    }

    const paramsMap = new Map([[ArticlesConst.USER_NAME, userName]])

    const fetchResult = await getArticles(paramsMap)

    if (!fetchResult["result"]) {
      const response = {
        message: "Not found",
        type: "not_found",
      }
      return res.status(404).json(response)
    }

    const resJson = fetchResult["resJson"]

    return res.json(resJson)
  }
}
