const Product = require('./prodectModel')


const createProduct = async (req, res)=>{
    try{
 const newproduct = await Product.create(req.body)
 res.status(201).json(newproduct)
    }
    catch(err){
    res.status(400).json(err)
}
}

const readAllProducts = async (req,res)=>{
    try{
        const products = await Product.find()
        res.status(200).json(products)
           }
           catch(err){
           res.status(400).json(err)
       }
}
const readOneById = async (req,res) => {
    try {
    const product = await Product.findById(req.params.id)
    if(product)
    res.status(200).json(product)
    res.status(404).json({ message: "Not Found!" })

}
catch(err){
    res.status(500).json({ message: err.message })

}
}

const updateOneById = async (req,res) => {
try{
    const updated = await Product.findByIdAndUpdate(req.params.id,req.body,{ new: true })
    if(updated)
    res.status(200).json(updated)
    res.status(404).json({ message: "Not Found!" })
}
catch(err){
    res.status(500).json({ message: err.message })
}
}

const deleteOneById = async (req,res) => {
    try{
       const deleted = await Product.findByIdAndDelete(req.params.id)
        if(deleted)
        res.status(200).json("deleted ",deleted)
        else res.status(404).json({ message: "Not Found!" })
    }
    catch(err){
        res.status(500).json({ message: err.message })
    }
}

const filterByPrice = async (req,res) => {
    try{
        const filtered = await Product.find({
            price: { $gte: req.params.start, $lte: req.params.limit }
        }
        )
        res.status(200).json(filtered)
    }
    catch(err){
        res.status(400).json(err)
    }
}

module.exports = {
    createProduct,
    readAllProducts,
    readOneById,
    updateOneById,
    deleteOneById,
    filterByPrice
};

