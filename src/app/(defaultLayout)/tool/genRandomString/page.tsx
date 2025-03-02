import { Metadata } from "next";
import { S } from "@components/all";
import { Form } from "./Form";

export const metadata: Metadata = {
  title:`ランダム文字列生成ツール`,
  description: `パスワードなどに必要なランダムな文字列を設定できます`,
  alternates: {
    canonical:'tool/genRandomString/'
  }
};

export default function Page() {
  return (
<>
  <S.lv1 isSrOnly={false} h1Elm='ランダム文字列生成ツール'>
    <p>ランダムな文字列を生成します。ブラウザで自動生成できないパスワードの候補が欲しいとき等にご利用ください。</p>
    <p>とりあえずは英数字だけ</p>
  </S.lv1>
  <article>
    <Form/>
  </article>
</>
  );
}
