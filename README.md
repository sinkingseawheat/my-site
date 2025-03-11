## 概要

このリポジトリは[Netx.jsのSSGで生成された私のサイト](https://www.sinkingseawheat.com/)のソースから一部の情報を除いたものです。
せっかく作ったので共有しようと思います。どんな感じで作成しているのか実例が見たい方の参考になれば幸いです。

## ドットファイルについて

このリポジトリでは.envを使用しています。NEXT_PUBLIC_GOOGLE_ANALYTICS_IDにGoogle アナリティクスの測定IDを、NEXT_PUBLIC_PROTOCOL_AND_FQDNにサイトのTOPページのURLをトレイリングスラッシュ無しで設定してください

例えば、Googleアナリティクスの測定IDがG-XXXXX、ページをおくFQDNが`https://example.com`の場合は以下のように設定します。

```Dotenv
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXX
NEXT_PUBLIC_PROTOCOL_AND_FQDN=https://example.com
```