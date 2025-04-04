import type { Metadata } from "next";

import {S, LinkText, PageList} from '@components/all'

export const metadata: Metadata = {
  title:`TOPページ`,
  description:`Sinking Sea WheatサイトのTOPページです。作成したツールやブログを執筆しています。`,
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
        読みづらいのでアカウント名を変更中。ドメインも変更しましたsinkingseawheat.com→midori-no-kiga.com。旧ドメインは失効させる予定です。<br/>
        sinkingseawheat→<strong><ruby>緑ノ企鵝<rp>(</rp><rt>ミドリノキガ</rt><rp>)</rp></ruby></strong><br/>
        「企鵝」は中国語でペンギンという意味らしいです。「人鳥」よりも字面がかっこいいと感じたので採用しました。
      </p>
      <p>
        サイト名は「Sinking Sea Wheat」のままにしておきます。
      </p>
      <p>
        作成したツールなどを公開しています。<br />
        ブログも書いています。<LinkText href="/blog/" isOpenAnotherTab={false} elm={`緑ノ企鵝(ミドリノキガ)blog`} prefetch={false} />
      </p>
      <p>
        このサイトの/blog配下を除いて、Next.jsのSSG生成で作成しています。<br />
        <LinkText href='https://github.com/sinkingseawheat/my-site' isOpenAnotherTab={true} elm={`このサイトのビルド前ソース（GitHubのページへ移動します）`} />を公開しています。<br />
      </p>
    </S.lv2>
    <PageList />
  </article>
</>
  );
}
