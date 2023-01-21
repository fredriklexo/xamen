
import styleModule from "./CircleBanner.module.css"
import Link from 'next/link'
import Button from "../comps/Button.js"

async function getData() {
    const res = await fetch('http://localhost:5000/product/getById/637b3ab4fb2b329daeb8084d');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
    
    return  res.json();
}


async function CircleBanner() {
    
    let  data  =  await getData();

   
    
    return (
        <section className={styleModule.container} >
            <div className={styleModule.wrapper} >
                <div className={styleModule.itemContainer}>

                

             <div className={styleModule.itemWrapper}>
                        <div className={styleModule.itemOne}>

                            <div className={styleModule.imageContainer}>
                                <img src="/blurb.svg" className={styleModule.imageOne} ></img>
                                <img src={data[0].src} className={styleModule.imageTwo} ></img>
                            </div>

                            <div className={styleModule.textContainer}>
                                <h3>{data[0].name}</h3>
                                <p>{data[0].description}</p>
                                <Link className={styleModule.productLink} href={{ pathname: "products/" + data[0].slug }}>Put me in your basket.. wink wink</Link>
                            </div>
                        </div>
                        
                    </div> 

                </div>


            </div>
        </section>
    )

}

export default CircleBanner