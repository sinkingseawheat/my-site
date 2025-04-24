import { type Metadata } from 'next';
import { L, SVGIcon, } from '@components/all';

import {S, PageList} from '@components/all'

export const metadata: Metadata = {
  title:`not found`,
  description:`ページが見つかりませんでした。`,
  robots: `noindex`,
  alternates: {
    canonical:'/'
  }
};

export default function Page() {

  return (
    <L.innerBody>
        <L.vb className='content'>
          <noscript>
            JavaScriptの実行が許可されていません。ページの機能に不具合が出る可能性があります
          </noscript>
          <main id="main-content">
            <S.lv1 isSrOnly={false} h1Elm={`お探しのページは見つかりませんでした`} />
              <PageList />
          </main>
        </L.vb>
      <SVGIcon.hiddenData />
    </L.innerBody>);
}