## 概要

このリポジトリは[Netx.jsのSSGで生成された私のサイト](https://midori-no-kiga.com/)のソースから一部の情報を除いたものです。
せっかく作ったので共有しようと思います。どんな感じで作成しているのか実例が見たい方の参考になれば幸いです。

## configについて

プロジェクトルートに「my-site.config.ts」を置いてください。

```typescript
export const userSpecificData = {
  notControlledLink: [
    {
      url:`https://github.com/sinkingseawheat/my-site`,
      title:`このページのリポジトリトップ（GitHubのページへ移動します）`,
      label:`outside`,
    },{
      url:`/blog/`,
      title:`WordPressを使用しているブログのTOPです`,
      label:`other`,
    },
  ], // ページ一覧などに表示するURLのうち、page.tsxなどのPagesで設定されていて、Next.jsでは制御していないページへのリンクです。labelを'outside'にすると別タブ遷移になります。
  googleAnalyticsId: `G-XXXXX`, // Googleアナリティクスの測定ID
  protocolAndFQDN: `https://example.com`, // サイトのTOPページのURL（トレイリングスラッシュ無し）
  authorName: `author name`, // 製作者の名前。headタグに挿入
  siteName: `site name`, // サイトの名前。headタグに挿入
}
```