# bankES
ElasticSearch入門用のサービス

## 実行方法
```
node app.js
# localhost:3000にサービスが立ち上がる
```
入力フォームに検索の条件を書き込む
例)
query : place
fields: address

この検索結果にはaddressという属性の値にplaceという文字列が入っていればその結果を返すというものである。
