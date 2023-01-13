

import MainNavigation from './components/navigation/mainNavigation.js'
import Footer from './components/navigation/footer/footer.js'
import './globals.css'




export default function RootLayout({ children }) {




  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <nav style={{ backgroundColor: "#182b27", display: "flex" }}>
          <MainNavigation />
        </nav>
        <main>
          {children}
        </main>
        <Footer />

      </body>
    </html>
  )
}

