import type { Metadata } from "next";


export const metadata: Metadata = {
  title:{
    default:`Sinking Sea Wheatのtoolページ`,
    template:`%s | tool`
  },
};

export default function Home({children}:{children:React.ReactElement}) {
  return children
}