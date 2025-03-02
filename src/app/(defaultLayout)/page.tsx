import type { Metadata } from "next";

import {S, List, LinkText} from '@components/all'

export const metadata: Metadata = {
  title:`TOPページ`,
  description:`TOPページです`,
  alternates: {
    canonical:'/'
  }
};

export default async function Page() {
  return (
    <>
  <S.lv1 isSrOnly={true} h1Elm='TOPページ' />
  <article>
    <S.lv2 title="このサイトについて">
      <p>SSG生成だとページリストの自動生成がどうしても厄介だったので、普通にSSGも使う感じでVercelにDeployする形に変更した。<br /><LinkText href='https://github.com/sinkingseawheat/my-site' isOpenAnotherTab={true} elm={`このサイトのビルド前ソース（GitHubのページへ移動します）`}/>を公開中。</p>
      <S.lv3 title="ツール作成しました">
        <List>
          <LinkText href='/tool/genRandomString/' isOpenAnotherTab={false} elm='ランダム文字列生成ツール' />
          <LinkText href='/tool/dp/' isOpenAnotherTab={false} elm='メディアの種別と特性'/>
          <LinkText href='https://github.com/sinkingseawheat/webpage_snapshot' isOpenAnotherTab={true} elm='Webページのスナップショット保存（GitHubのページへ移動します）'/>
        </List>
      </S.lv3>
      <S.lv3 title="その他コンテンツ">
        <List>
          <LinkText href='/profile/' isOpenAnotherTab={false} elm='作者の紹介ページ'/>
          <LinkText href='https://github.com/sinkingseawheat/my-site' isOpenAnotherTab={true} elm='このサイトのビルド前ソース（GitHubのページへ移動します）'/>
        </List>
      </S.lv3>
    </S.lv2>
  </article>
</>
  );
}
