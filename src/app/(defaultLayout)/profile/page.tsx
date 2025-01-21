import { Metadata } from "next";
import { S, } from "@components/all";
import { CardList } from "./CardList";

export const metadata: Metadata = {
  title:`作者の紹介ページ`,
  description: `sinkingseawheatのサイトの作者の紹介ページです。`,
  alternates: {
    canonical:'profile'
  }
};

export default function Profile() {
  return (
<>
  <S.lv1 isSrOnly={true} h1Elm='作者の紹介ページ' />
  <article>
    <S.lv2 title={`ソフトウェア技術以外での私についての紹介`}>
      <p>1987年生まれの男性。沖縄住まい。体がもたないのでジョギング続けてます。2024年9月現在は退職してキャッチアップのため再勉強中と転職活動中。</p>
    </S.lv2>
    <S.lv2 title={`業務経験`}>
      <p>歴史の長い、巨大なサイトの保守・運用を9年ほど担当しました。<br />Node.jsなど効率化できるツールがほとんど無かった時代から存在しているサイトのため、CSS・JSファイルは直接修正することが多かったです。<br />HTMLは最初はほぼスクラッチで運用するCMSを利用していましたが、途中マイグレーションを経てコンポネ中心に移行しました。<br />その時は主にコンポネで対応できないLP制作を担当しました。</p>
      <p>WCAGのAAに適合させるアクセシビリティ対応も行ったことがあります。</p>
      <p>PhotoShopとAdobeXDは切り出しなどコーダーが使う分の利用経験がありますが、バナー制作やカンプ作成などのデザインはやったことないです。illustratorなど他のAdobe製品はほとんど利用したことが無いです。</p>
      <p>ディレクションは挑戦しましたが、あまり向いていないようでしたので諦めました。</p>
      <p>WordPress、DrupalなどのCMSは利用したことありません。AdobeExperienceManagerは利用したことがあります。ただし、かなりカスタマイズされていました。</p>
      <S.lv3 title={`HTML、CSS、JavaScriptの業務経験`}>
        <p>HTMLは直接触ることが多かったです。pugやejsなどのテンプレートエンジンは触ったことないです。アンダースコアのテンプレート機能は一部のページに使用されていたため利用経験あります。</p>
        <p>CSSも直触ることが多かったです。Node.jsのLibSassであれば利用経験あります。</p>
        <p>JSも直接触ることが多かったです。アクセシビリティ対応のため、外部制作会社が制作したminifyされたJSを、修正可能にするためbeautifyする変わった業務をしたことがあります。</p>
      </S.lv3>
    </S.lv2>
    <S.lv2 title={`他サイトのプロフィール`}>
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
              textAccount: '@sinkingseawheat',
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
              textAccount: 'sinkingseawheat',
            },
            {
              href: 'https://qiita.com/sinking-sea-wheat',
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
              textAccount: '@sinking-sea-wheat',
            },
            {
              href:
                'https://bsky.app/profile/sinkingseawheat.bsky.social',
              isOpenAnotherTab: true,
              ariaLabel: 'Blueskyで筆者のプロフィール画面を開く',
              img: {
                class: '-bluesky',
                src: '/c/vendor/logo/bluesky.svg',
                alt: 'Bluesky',
                width: 300,
                height: 300,
              },
              textName: 'Bluesky',
              textAccount: '@sinkingseawheat.bsky.social',
            },
          ]}
        />
      </S.lv3>
      <S.lv3 title={`副業`}>
        <CardList
          listElms={[
            {
              href: 'https://www.lancers.jp/profile/sinkingseawheat',
              isOpenAnotherTab: true,
              ariaLabel: 'Lancersで筆者のプロフィール画面を開く',
              textName: 'Lancers',
              textAccount: 'sinkingseawheat',
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
