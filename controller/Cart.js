
const db = require('../models')

const getOrder = async (req, res) => {
    const targetOrder = await db.Cart.findAll({ include: { model: db.Product }, where: { user_id: req.user.id } })
    res.status(200).send(targetOrder)
    console.log(targetOrder)
}

const selectOrder = async (req, res) => {
    const { amount, product_id } = req.body
    console.log(amount)
    console.log(product_id)
    const newOrder = await db.Cart.create({
        user_id: req.user.id,
        amount,
        product_id,
    })
        .catch(err => { console.log(err.message) })
    res.status(201).send(newOrder)
}

const updateOrder = async (req, res) => {
    const { amount, id, item } = req.body
    console.log(req.body)
    const updateOrder = await db.Cart.findOne({ where: { product_id: id, user_id: req.user.id } });
    
    console.log(updateOrder)
    if (updateOrder) {
        await updateOrder.update({ amount: updateOrder.amount + amount });
        res.status(200).send(updateOrder)
    } else {
        const newOrder = await db.Cart.create({...item, amount: 1, user_id: req.user.id, product_id: id})
        res.status(200).send(newOrder)
    }

}

const deleteOrder = async (req, res) => {
    const { id } = req.params
    const targetDelete = await db.Cart.findOne({ where: { id } })
    if (targetDelete) {
        await targetDelete.destroy()
        res.status(204).send({ message: `deleteOrder ID : ${targetDelete} is deleted` })
    } else {
        res.status(404).send({ message: `Todo ID : ${targetTodoId} is not found` })
    }
}

const deleteAllOrder = async (req, res) => {
    await db.Cart.destroy({ where: { user_id: req.user.id } })
    res.status(204).send({ message: `delete Cart: is deleted` })
    // res.send("delete")
}



module.exports = {
    getOrder,
    selectOrder,
    updateOrder,
    deleteOrder,
    deleteAllOrder
}