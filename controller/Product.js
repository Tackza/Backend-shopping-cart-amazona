const db = require("../models")
const { Op } = require('sequelize')

const getAllProduct = async (req, res) => {
    const { name, category } = req.query
    const whereProductName = {}
    if (name) {
        whereProductName.name = { [Op.like]: `%${name}%` }
    }
    const whereObj = { where: { ...whereProductName } };
    const productAll = await db.Product.findAll(whereObj)
    res.status(200).send(productAll)
}

const targetCategory = async (req, res) => {
    const targetByCategory = req.body.category
    const targetCategory = await db.Product.findAll({ where: { category: targetByCategory } })
    if (targetCategory) {
        res.status(200).send(targetCategory)
    } else {
        res.status(404).send({ message: "Category is not found" })
    }
}

const createProduct = async (req, res) => {
    const { name, category, price, amount, image } = req.body
    await db.Product.create({
        name,
        category,
        price,
        amount,
        image
    })
    res.status(201).send({ message: "Product created" })
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    const targetProduct = await db.Product.findOne({ where : {id} })
    if (targetProduct) {
        await targetProduct.destroy()
        res.status(201).send({ message: `${id} is deleted` })
    } else {
        res.status(401).send({ message: "can't delete " })
    }
}

const updateProduct = async (req,res) => {
    const {id} = req.params
    const { name, category, price, amount, image } = req.body
    const targetProduct = await db.Product.findOne({where: {id}})
    if(targetProduct){
        await targetProduct.update({
            name,
            category,
            price,
            amount,
            image
        })
        res.status(201).send({message : `Product ID : ${id} is updated`})
    }else{
        res.status(401).send({message : " is not found"})
    }
}



module.exports = {
    getAllProduct,
    targetCategory,
    createProduct,
    deleteProduct,
    updateProduct
}