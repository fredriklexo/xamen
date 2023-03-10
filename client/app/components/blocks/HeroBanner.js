
import styleModule from "./HeroBanner.module.css"


function HeroBanner(){

    return(
        <section  className={styleModule.sectionContainer}>
                <img alt="herobanner" className={styleModule.heroImg} src="/banners/test.jpeg"></img>
            <div className={styleModule.container} >
                <div className={styleModule.text}>
                    <img alt="logo circle" src="/Starbucks-Logo.png" className={styleModule.logo}></img>
                    <h1>Starbucks</h1>
                    <h2>This is not a real site!</h2>
                   
                
                </div>
                
            </div>
        </section>
    )

}

export default HeroBanner