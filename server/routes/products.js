import express from 'express'
import Product from '../model/Product.js'

const router = express.Router()


//gett all products
router.get('/getAll', async (req, res) => {
    
    try {
        const products = await Product.find()
        
        
        res.json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
   
})


// Get product by id
router.get('/getById/:id', async (req,res) => {
    
    try {
        
        const finProduct = await Product.find({_id: req.params.id})
       
        res.json(finProduct)
    } catch (error) {
        res.status(404).json({message: error.message})
    }

})


// Get product by slug
router.get('/getBySlug/:slug', async (req,res) => {
    
    try {
     
        const finProduct = await Product.find({slug: req.params.slug})
        
        res.json(finProduct)
    } catch (error) {
        res.status(404).json({message: error.message})
    }

})


// Get product by id
router.get('/getByCategory/:id', async (req,res) => {
    
    try {
        
        if(req.params.id == "undefined"){
           
            const products = await Product.find()
            return res.json(products)
        }else{
            
            const finProduct = await Product.find({categoryId: req.params.id})
           
            return res.json(finProduct)
        }
       
        res.json(finProduct)
    } catch (error) {
        res.status(404).json({message: error.message})
    }

})



export default router

