// import styleModule from "../[slug]/product.module.css"
import styleModule from "../[slug]/product.module.css"
import AddToCartBtn from "../[slug]/addToCartBtn.js"




async function getData(slug) {
    const res = await fetch(`http://localhost:5000/product/getBySlug/${slug}`);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
  
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
    
    return  res.json();
}
async function getCategoryById(id) {

    const res = await fetch("http://localhost:5000/category/getByCategoryId", {
    
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({categoryId: id})
    
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    


    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
    
    return  res.json();
}



export default async function renderProduct( props) {
    let  data =  await getData(props.params.slug);
    let  item = data[0];
    let  cat =  await getCategoryById(item.categoryId);
   
    return (
        <section  className={styleModule.container} >
            <div className={styleModule.wrapper} >
                <div className={styleModule.itemContainer }>

                    <div className={styleModule.itemInfo }>
                        <h1>{item.name}</h1>
                        <p>{item.type}</p>
                        <h2>{item.description}</h2>

                        <div className={styleModule.categoryContainer}>
                            {cat.map((obj) => {
                                
                                return( 
                                    <div key={obj._id} className={styleModule.categoryItem} >
                                        <img src={obj.featuresSrc} className={styleModule.categoryIcon} />
                                        <p>{ obj.name }</p>
                                    </div>
                                )
                            })}
                            <div className={styleModule.featuresContainer}>
                                <img className={styleModule.featuresIcon} src="/product/icons-coffee-beans.png"></img>
                                <p>{item.features}</p>
                            </div>
                        </div>
                        
                        <p>{item.price} kr</p>
                        {/* <button className="buttonStyle" >Buy now</button> */}
                        <AddToCartBtn  productid={item._id} />
                    </div> 

                    <div className={styleModule.itemImgContainer }>
                        <img className={styleModule.productImg }src={item.src} />
                        <img className={styleModule.ilustrationImgRight }src="/testing.png" />
                        <img className={styleModule.ilustrationImgLeft  }src="/testing.png" />
                    </div> 
                    
                </div>
            </div>
        </section>
    )
}
