import type { Metadata } from "next";

import {S, LinkText, PageList} from '@components/all'

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
      <p>
        作成したツールなどを公開しています。そのうちブログ形式で製品・サービスレビューとかも書きたい。
      </p>
      <p>
        このサイトはNext.jsのSSG生成で作成しています。<br />
        <LinkText href='https://github.com/sinkingseawheat/my-site' isOpenAnotherTab={true} elm={`このサイトのビルド前ソース（GitHubのページへ移動します）`}/>を公開しています。<br />
      </p>
    </S.lv2>
    <PageList />
  </article>
</>
  );
}
