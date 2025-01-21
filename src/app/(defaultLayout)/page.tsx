import type { Metadata } from "next";

import {S, List, LinkText} from '@components/all'

export const metadata: Metadata = {
  title:`TOPページ`,
  description:`TOPページです`,
  alternates: {
    canonical:'/'
  }
};

export default function Home() {
  return (
    <>
  <S.lv1 isSrOnly={true} h1Elm='TOPページ' />
  <article>
    <S.lv2 title="このサイトについて">
      <p>何か色々書いて、それから方向を見定める予定です。<br /></p>
      <p>雑に作ったビルドツールにて生成しなおしました。(2024/12/20)</p>
      <p>Next.jsのSSG生成に切り替えました(2025/1/21)</p>
      <S.lv3 title="ツール作成しました">
        <List>
          <LinkText href='/tool/dp/' isOpenAnotherTab={false} elm='メディアの種別と特性'/>
          <LinkText href='https://github.com/sinkingseawheat/webpage_snapshot' isOpenAnotherTab={true} elm='Webページのスナップショット保存（GitHubのページへ移動します）'/>
        </List>
      </S.lv3>
      <S.lv3 title="その他コンテンツ">
        <List>
          <LinkText href='/profile/' isOpenAnotherTab={false} elm='作者の紹介ページ'/>
        </List>
      </S.lv3>
    </S.lv2>
  </article>
</>
  );
}
