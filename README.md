## 概要

このリポジトリは[Netx.jsのSSGで生成された私のサイト](https://midori-no-kiga.com/)のソースから一部の情報を除いたものです。
せっかく作ったので共有しようと思います。どんな感じで作成しているのか実例が見たい方の参考になれば幸いです。

## ドットファイルについて

このリポジトリでは.envを使用しています。
| 環境変数 | 説明 |
|---|---|
| NEXT_PUBLIC_GOOGLE_ANALYTICS_ID | Google アナリティクスの測定ID |
| NEXT_PUBLIC_PROTOCOL_AND_FQDN | headタグ内部で使用。TOPページのURLをトレイリングスラッシュ無しで設定する |
| NEXT_PUBLIC_AUTHOR_NAME | headタグ内部で使用。サイトの作成者を設定 |
| NEXT_PUBLIC_SITE_NAME | headタグ内部で使用。サイト名を設定 |

NEXT_PUBLIC_GOOGLE_ANALYTICS_IDにGoogle アナリティクスの測定IDを、NEXT_PUBLIC_PROTOCOL_AND_FQDNにサイトのTOPページのURLをトレイリングスラッシュ無しで設定してください

例えば、Googleアナリティクスの測定IDがG-XXXXX、ページをおくFQDNが`https://example.com`の場合は以下のように設定します。

```Dotenv
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXX
NEXT_PUBLIC_PROTOCOL_AND_FQDN=https://example.com
NEXT_PUBLIC_AUTHOR_NAME=author name
NEXT_PUBLIC_SITE_NAME=site name
```