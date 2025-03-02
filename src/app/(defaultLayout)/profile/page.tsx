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

export default function Page() {
  return (
<>
  <S.lv1 isSrOnly={true} h1Elm='作者の紹介ページ' />
  <article>
    <S.lv2 title={`概要的なやつ`}>
      <p>
        1987年生まれの男性。沖縄住まい。<br />
        フルスクラッチのLP制作が得意。WordPressとかのCMSはほとんど触ったことない。<br />
        最近はNext.jsで遊んでたり、Figmaを触ってたりする。<br />
        適当に生きながら転職活動中@2025/3現在
      </p>
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
