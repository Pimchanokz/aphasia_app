"use client"
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import "./globals.css";
import useQuiz from "./store";

const roboto = Roboto({ 
  weight: '400',
  subsets: ["latin"] 
});

// export default function RootLayout({
//   children,
//   quiz
// }: {
//   children: React.ReactNode,
//   quiz:React.ReactNode

// }) {
//   const config = useQuiz(state=>state.config)
//   let render = config.status ? quiz : children;
//   return (
//     <html lang="en">
//       <body className={roboto.className}>{render }</body>
//     </html>
//   )
// }

// export const metadata: Metadata = {
//   title: "Speech Therapy Apps",
//   description: "Application for therapy peopke with aphasia symtoms",
// };

export default function RootLayout({
  children,
  quiz
}: Readonly<{
  children: React.ReactNode,
  quiz: React.ReactNode
}>) {
  
  const config = useQuiz(state=> state.config)
  let render = config.status? quiz : children;

  return (
    // <ClerkProvider>
      <html lang='en'>
        <body className={roboto.className}>
        {/* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
          {render}
        </body>
      </html>
    // {/* </ClerkProvider> */}
  );
}