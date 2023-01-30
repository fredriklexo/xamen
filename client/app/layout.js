

import MainNavigation from './components/navigation/mainNavigation.js'
import Footer from './components/navigation/footer/footer.js'
import './globals.css'
import style from "./mainLayout.module.css"
import Loading from './loading.js';
import { Suspense } from "react";


export default function RootLayout({ children }) {




  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <nav style={{ boxShadow: "0 2px 2px -2px rgba(0,0,0,.5)", display: "flex" }}  >
          <MainNavigation />
        </nav>
        <main className={style.mainContainer}>
          <Suspense fallback={<Loading />}>
              {children}
          </Suspense>
        </main>
        <div style={{ display: "flex" }} className="thirdColor">

          <Footer />
        </div>

      </body>
    </html>
  )
}

