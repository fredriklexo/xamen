import CategoryBanner from './components/blocks/CategoryBanner.js';
import HeroBanner from './components/blocks/HeroBanner.js';
import CircleBanner from './components/blocks/CircleBanner.js';
import MainNavigation from './components/navigation/MainNavigation.js'

export default async function Home() {
 
  return (
    <>
      <MainNavigation/> 
      <section>
          
            <HeroBanner />
            <CircleBanner />
            <CategoryBanner />
        
      </section>
    </>
  )
}

