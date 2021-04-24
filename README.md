# article-collection-bff

## API仕様書

- [こちら](https://kamimi01.github.io/article-collection-architecture/)で公開中

## 環境構築

- `@vendia/serverless-express`を導入する
  - `yarn add @vendia/serverless-express`
- `serverless.yml`を作成する
- `yarn install`を行う

## デプロイ

1. `node_modules`を削除する
2. `yarn install --production`を実行する
  - `devDependencies`がインストールされない
  - `node_moduels`はサイズが大きくなりがちなため、不要なモジュールのインストールは避ける
3. `sls deploy`を行う