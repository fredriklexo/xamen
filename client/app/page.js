import CategoryBanner from './components/blocks/CategoryBanner.js';
import HeroBanner from './components/blocks/HeroBanner.js';
import InfoBanner from './components/blocks/InfoBanner.js';
import CircleBanner from './components/blocks/CircleBanner.js';


export default async function Home() {
 
  return (
    <section>
        <HeroBanner />
        <CategoryBanner />
        <CircleBanner />
        <InfoBanner />
    </section>
  )
}

