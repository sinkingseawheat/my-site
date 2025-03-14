import { Metadata } from "next";
import { S, L } from "@components/all";
import { ResultTable } from "./ResultTable";

export const metadata: Metadata = {
  title:`メディアの種別と特性を確認`,
  description: `閲覧しているデバイス・ブラウザのメディアクエリの結果を確認できます`,
  alternates: {
    canonical:'tool/dp/'
  }
};

export default function Page() {
  return (
<>
  <S.lv1 isSrOnly={true} h1Elm='メディアの種別と特性を確認'>
    <p>window.matchMediaを利用してそれぞれの結果を表で記載します。<br/>真偽値がtrueとなっている行は着色しています。</p>
    <p>（2024/10/17追記）<br/>よく考えたら、普通にメディアクエリで判定したほうが簡素ですよね…。そのうち、それで作成しなおす予定。</p>
  </S.lv1>
  <article>
    <S.lv2 title={`結果`}>
      <L.column minColumnWidth="35em" columnGap="2em">
        <ResultTable<[string, string]>
          cellMinWidth="6em"
          contentHeight="60vh"
          caption={`メディア種別`}
          data={[
            ['プロパティ','真偽値'],
            ['all',''],
            ['print',''],
            ['screen',''],
            ['speech',''],
          ]}
          fillType='1'
        />
        <ResultTable<[string, string, string, string]>
          cellMinWidth="8em"
          contentHeight="60vh"
          caption={`メディア特性`}
          data={[
            ['プロパティ','値','真偽値','メディアクエリ'],
            ['any-hover','none','',''],
            ['any-hover','hover','',''],
            ['hover','none','',''],
            ['hover','hover','',''],
            ['any-pointer','none','',''],
            ['any-pointer','coarse','',''],
            ['any-pointer','fine','',''],
            ['pointer','none','',''],
            ['pointer','coarse','',''],
            ['pointer','fine','',''],
            ['prefers-reduced-motion','no-preference','',''],
            ['prefers-reduced-motion','reduce','',''],
            ['update','none','',''],
            ['update','slow','',''],
            ['update','fast','',''],
            ['prefers-color-scheme','light','',''],
            ['prefers-color-scheme','dark','',''],
            ['scripting','none','',''],
            ['scripting','initial-only','',''],
            ['scripting','enabled','',''],
            ['monochrome','0','',''],
            ['monochrome','','',''],
            ['orientation','portrait','',''],
            ['orientation','landscape','',''],
            ['display-mode','fullscreen','',''],
            ['display-mode','standalone','',''],
            ['display-mode','minimal-ui','',''],
            ['display-mode','browser','',''],
            ['color','','',''],
            ['color-gamut','srgb','',''],
            ['color-gamut','p3','',''],
            ['color-gamut','rec2020','',''],
            ['forced-colors','none','',''],
            ['forced-colors','active','',''],
            ['prefers-contrast','no-preference','',''],
            ['prefers-contrast','more','',''],
            ['prefers-contrast','less','',''],
            ['inverted-colors','none','',''],
            ['inverted-colors','inverted','',''],
            ['overflow-block','none','',''],
            ['overflow-block','scroll','',''],
            ['overflow-block','optional-paged','',''],
            ['overflow-block','paged','',''],
            ['overflow-inline','none','',''],
            ['overflow-inline','scroll','',''],
            ['grid','0','',''],
            ['grid','1','',''],
          ]}
          fillType='2'
        />
      </L.column>
    </S.lv2>
  </article>
</>
  );
}
