
'use client'
import styleModule from "./InfoBanner.module.css"
import Button from "@mui/material/Button"

function InfoBanner() {

    

    return (
        <section className={styleModule.container} >
            <div className={styleModule.wrapper} >
                <div className={styleModule.itemContainer}>
                    <div className={styleModule.itemWrapper}>
                        <div className={styleModule.itemOne}>
                                <h3> BEST COFFE</h3>
                                <p>loremipsum loremip sumlore mipsuml orem ipsu ml oremipsum loremipsum </p>
                                <Button variant="contained">Contained</Button>
                        </div>
                        <div className={styleModule.itemTwo}>
                            <img src="https://mobimg.b-cdn.net/v3/fetch/74/746b7c7b2a2b4547f995c951ed588e68.jpeg?w=1470&r=0.5625" className={styleModule.image} /> 
                           
                        </div>
                        <div className={styleModule.itemThree}>
                
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )

}

export default InfoBanner