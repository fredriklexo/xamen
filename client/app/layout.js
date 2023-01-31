

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

