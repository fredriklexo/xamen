import MainNavigation from '../components/navigation/MainNavigation.js'

export default function DashboardLayout({children}){
  
    return (
        <>
        <MainNavigation/>
        <section>{children}</section>
        </>

    )
}