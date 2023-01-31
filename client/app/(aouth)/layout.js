import MainNavigation from '../components/navigation/mainNavigation.js'

export default function DashboardLayout({children}){
  
    return (
        <>
        <MainNavigation/>
        <section>{children}</section>
        </>

    )
}