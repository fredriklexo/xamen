
import styleModule from "./CategoryBanner.module.css"
import Link from "next/link";

async function getData() {
    const res = await fetch('http://localhost:5000/category/getAll');
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
    
    return  res.json();
}

async function CategoryBanner(){
        
      let  data  =  await getData();

      
    return(
        <section  className={styleModule.container} >
            <div className={styleModule.wrapper} >
                <div className={styleModule.itemContainer }>
                    {data.map((obj) => {
                
                        return( 
                            <Link key={obj.categoryId} className={styleModule.item} href={{ pathname: "products", query: { category: obj.categoryId } }}>
                            
                                <img src={obj.src} className={styleModule.image} />
                                <div className={styleModule.itemTextContainer}>
                                    <h4>{ obj.name }</h4>
                                    <p>this is a MEGA SUPER category</p>
                                </div>
                            
                            </Link>
                        )
                    })}
                                       
                                      
                    
                </div>
                
            </div>
        </section>
    )

}

export default CategoryBanner