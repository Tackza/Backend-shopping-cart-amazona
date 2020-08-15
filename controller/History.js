const db = require('../models')


const getOrder = async (req, res) => {
    const order = await db.HistoryProduct.findAll({
        include: {
            model: db.Product,
            include: { model: db.HistoryProduct }
        },
        where: { user_id: req.user.id }
    })
    console.log(order)
    res.status(200).send(order)
}

const getOrderAll = async (req, res) => {
    const order = await db.HistoryProduct.findAll()
    res.status(201).send(order)
}


const inputOrder = async (req, res) => {
    // const {amount, Product :{price,name}} =  req.body;
    // console.log(req.body)
    const { history } = req.body;
    console.log(history)

    let sum = history.reduce((total, item) => total + item.amount * item.price, 0);
    const newOder = await db.Order.create({ total_price: sum, HistoryProducts: history }, {
        include: [db.HistoryProduct]
    });
    res.status(200).send(newOder)
}

module.exports = {
    inputOrder,
    getOrder,
    getOrderAll
}