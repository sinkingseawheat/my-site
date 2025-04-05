import type { Metadata } from "next";

import {S, List} from '@components/all'

export const metadata: Metadata = {
  title:`ウェブアクセシビリティ方針`,
  description:`このサイトのウェブアクセシビリティ方針を記述したページとなります。`,
  alternates: {
    canonical:'/accessibility/'
  }
};

export default async function Page() {
  return (
    <>
  <S.lv1 isSrOnly={false} h1Elm='ウェブアクセシビリティ方針' />
  <article>
    <S.lv2 title="対象範囲">
      <p><strong>以下を除く</strong>範囲を対象としています。</p>
      <List>
        <span>https://midori-no-kiga.com/blog 配下</span>
        <span>https://midori-no-kiga.com/script 配下</span>
      </List>
    </S.lv2>
    <S.lv2 title={`配慮項目`}>
      <List>
        <span>文章構造</span>
        <span>キーボード操作</span>
        <span>音声ブラウジング</span>
        <span>ナビゲーション</span>
        <span>フォーム</span>
      </List>
    </S.lv2>
    <S.lv2 title={`目標とする達成基準`}>
      <p>WCAG2.2の「AA」への準拠を目標としています。</p>
    </S.lv2>
  </article>
</>
  );
}
