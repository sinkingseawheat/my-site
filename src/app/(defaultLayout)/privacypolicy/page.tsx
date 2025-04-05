import { Metadata } from "next";
import { S, List, LinkText } from "@components/all";

export const metadata: Metadata = {
  title:`プライバシーポリシー`,
  description: `プライバシーポリシーです`,
  alternates: {
    canonical:'privacypolicy/'
  }
};

export default function Page() {
  return (
<>
  <S.lv1 isSrOnly={false} h1Elm='プライバシーポリシー' />
  <article>
    <S.lv2 title={`1. はじめに`}>
      <p>
      本サイト（以下、「当サイト」）をご利用いただき、誠にありがとうございます。訪問者のプライバシーを尊重し、個人情報の保護に努めています。本プライバシーポリシーでは、当サイトにおける個人情報の収集、利用、管理について説明します。
      </p>
    </S.lv2>
    <S.lv2 title={`2. 収集する情報`}>
      <p>当サイトでは、以下の方法で訪問者の情報を収集する場合があります。</p>
      <S.lv3 title={`Google Analytics によるアクセス解析`}>
        <p>当サイトでは、Google Analyticsを利用して、訪問者のサイト利用状況を分析しています。Google Analyticsは、Cookieを使用してデータを収集し、匿名の統計情報として提供します。</p>
        <dl>
          <div>
            <dt>収集される情報の例</dt>
            <dd>
              <List>
                <>IPアドレス</>
                <>使用デバイスやブラウザの種類</>
                <>訪問日時、滞在時間、閲覧ページ など</>
              </List>
            </dd>
          </div>
        </dl>
        <p>Google Analyticsの詳細については、<LinkText href='https://policies.google.com/technologies/partner-sites' isOpenAnotherTab={true} elm='Google のサービスを使用するサイトやアプリから収集した情報の Google による使用 – ポリシーと規約 – Google' />をご確認ください。</p>
      </S.lv3>
      <S.lv3 title={`Google AdSense による広告配信`}>
        <p>当サイトでは、Google AdSenseを利用し、広告を掲載しています。Googleおよびその提携会社は、Cookieやウェブビーコンを使用して、ユーザーの訪問履歴に基づいた広告を配信します。</p>
        <p>Google AdSenseのパーソナライズド広告を無効にする方法については、<LinkText href="https://adssettings.google.com/" isOpenAnotherTab={true} elm={`Google広告設定`} />をご参照ください。</p>
      </S.lv3>
      <S.lv3 title={`お問い合わせフォーム`}>
        <p>当サイトのお問い合わせフォームを利用する際、お名前・メールアドレスなどの個人情報を入力いただく場合があります。収集した情報は、お問い合わせ対応の目的以外には使用しません。<br />ただし、お問い合わせ内容について個人やサイトを特定できない形で記事にする可能性がございます。</p>
      </S.lv3>
      <S.lv3 title={`コメントについて`}>
        <p>荒らし対策やスパム検出のため、コメントで記載いただいた氏名（アカウント名）、メールアドレス、コメント内容、IPアドレスを取得いたします。<br/>
        また、記事内において、ユーザー様からのコメントといった形で内容を紹介させていただく場合もございます。<br/>
        コメントは承認制となっておりますため、運営者が承認しないものに関しては、公開されません。その際に入力いただいた個人情報は同時に廃棄いたします。<br/>
        コメントを投稿された段階で、プライバシーポリシーに同意いただいたとみなします。あらかじめご承知願います。</p>
      </S.lv3>
    </S.lv2>
    <S.lv2 title={'個人情報の管理'}>
      <p>当サイトでは、訪問者から提供された個人情報を適切に管理し、第三者への提供・共有は行いません。ただし、以下の場合を除きます。</p>
      <List>
        <>法的義務により開示が求められた場合</>
        <>訪問者の同意がある場合</>
      </List>
    </S.lv2>
    <S.lv2 title={'Cookie（クッキー）の使用'}>
      <p>当サイトでは、Google AnalyticsやGoogle AdSenseの機能、およびその他の広告配信のためにCookieを使用しています。Cookieの使用を希望しない場合は、ブラウザの設定で無効にすることができます。</p>
    </S.lv2>
    <S.lv2 title={'免責事項'}>
      <p>当サイトに掲載されたリンクや広告から他のサイトに移動した場合、移動先のサイトで提供される情報やサービスについては、一切の責任を負いません。</p>
      <p>当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますこと、あらかじめご承知願います。当サイトをご利用いただく際は、自己責任でおこなわれるようお願いいたします。</p>
      <p>当サイトの内容、情報は正確性を重視して掲載しておりますが、情報が古くなったり、誤情報が入っていたりする可能性もあります。必ずしも正確性を保証するものではありません。</p>
    </S.lv2>
    <S.lv2 title={`プライバシーポリシーの変更`}>
      <p>本プライバシーポリシーは、必要に応じて改定する場合があります。最新の内容は、本ページにて随時更新されます。</p>
    </S.lv2>
    <S.lv2 title={`お問い合わせ`}>
      <p>本プライバシーポリシーに関するお問い合わせは、以下のフォームよりご連絡ください。</p>
      <LinkText href="/script/mailform/contact/" isOpenAnotherTab={true} elm={`お問い合わせフォーム`} prefetch={false}/>
    </S.lv2>
  </article>
</>
  );
}
