import express from 'express'
import Category from '../model/Category.js'

const router = express.Router()


//gett all category
router.get('/getAll', async (req, res) => {
    
    try {
        const category = await Category.find()
       
        res.json(category)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
   
})


// Get category by id
router.get('/getById/:id', async (req,res) => {
    
    try {

        const findCategory = await Category.find({categoryId: req.params.id})

        res.json(findCategory)
    } catch (error) {
        res.status(404).json({message: error.message})
    }

})


router.post('/getByCategoryId', async (req,res) => {
    
    try {
        const test = await Category.find( { categoryId: { $in: req.body.categoryId } })
  
        res.json(test)
    } catch (error) {
        res.status(404).json({message: error.message})
    }

})

export default router

