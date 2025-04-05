import { Metadata } from "next";
import { S, } from "@components/all";
import { CardList } from "./CardList";

export const metadata: Metadata = {
  title:`作者の紹介ページ`,
  description: `作者の紹介ページです。`,
  alternates: {
    canonical:'profile/'
  }
};

export default function Page() {
  return (
<>
  <S.lv1 isSrOnly={false} h1Elm='作者の紹介ページ' />
  <article>
    <S.lv2 title={`概要的なやつ`}>
      <p>
        1987年生まれの男性。沖縄住まい。<br />
        フルスクラッチのLP制作が得意。HTML/CSS/JavaScriptは結構自信あり。<br />
        独立を目指している。
      </p>
    </S.lv2>
    <S.lv2 title={`アカウント名（ハンドルネーム）を変更しました。`}>
      <p>
        読み辛いので、2024年4月ごろからアカウント名を以下のように変更しました。<br />
        sinkingseawheat<span role="presentation"> </span>→<span role="presentation"> </span><ruby>緑ノ企鵝<rp>(</rp><rt>ミドリノキガ</rt><rp>)</rp></ruby>、アルファベット表記はmidori-no-kiga<br />
        Webサイトのアドレスやメールアドレスも変更中（<span role="presentation"> </span>sinkingseawheat.com<span role="presentation"> </span>→<span role="presentation"> </span>midori-no-kiga.com<span role="presentation"> </span>）です。想定上に面倒くさいですが…<br />
        旧ドメインsinkingseawheat.comの有効期限（2025/9/16）は更新せずに、失効させる予定です。
      </p>
    </S.lv2>
    <S.lv2 title={`他サイトのプロフィール`}>
      <p>BlueSkyは日本語圏の情報が少ないのでアカウントを削除します。<br />情報発信は当サイトとXで固定しようかなって思ってます。</p>
      <S.lv3 title={`情報系・GitHub`}>
        <CardList
          listElms={[
            {
              href: 'https://x.com/sinkingseawheat',
              isOpenAnotherTab: true,
              ariaLabel: 'Xで筆者のプロフィール画面を開く',
              img: {
                class: '-x',
                src: '/c/vendor/logo/logo_x.svg',
                alt: 'X',
                width: 1200,
                height: 1227,
              },
              textName: 'X',
              textAccount: '緑ノ企鵝（ミドリノキガ）',
            },
            {
              href: 'https://github.com/sinkingseawheat',
              isOpenAnotherTab: true,
              ariaLabel: 'GitHub',
              img: {
                class: '-github',
                src: '/c/vendor/logo/github-mark.svg',
                alt: 'GitHub',
                width: 98,
                height: 96,
              },
              textName: 'GitHub',
              textAccount: 'midori-no-kiga',
            },
            {
              href: 'https://qiita.com/midori-no-kiga',
              isOpenAnotherTab: true,
              ariaLabel: 'Qiitaで筆者のプロフィール画面を開く',
              img: {
                class: '-qiita',
                src: '/c/vendor/logo/qiita-white-icon.png',
                alt: 'Qiita',
                width: 300,
                height: 300,
              },
              textName: 'Qiita',
              textAccount: '@midori-no-kiga',
            },
          ]}
        />
      </S.lv3>
      <S.lv3 title={`お仕事`}>
        <CardList
          listElms={[
            {
              href: 'https://www.lancers.jp/profile/sinkingseawheat',
              isOpenAnotherTab: true,
              ariaLabel: 'Lancersで筆者のプロフィール画面を開く',
              textName: 'Lancers',
              textAccount: '緑ノ企鵝（ミドリノキガ）',
              noteElm: ['ブランドガイドラインが見つからなかったのでアイコン無し'],
            },
          ]}
        />
      </S.lv3>
    </S.lv2>
  </article>
</>
  );
}
