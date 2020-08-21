const db = require('../models')
const bc = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const register = async (req, res) => {
    const { username, password, name } = req.body
    const targetUser = await db.User.findOne({ where: { username } })

    if (targetUser) {
        res.status(400).send({ message: "Username already used" })
    } else {
        const salt = bc.genSaltSync(Number(process.env.ROUND))
        const hashedPW = bc.hashSync(password, salt)

        await db.User.create({
            password: hashedPW,
            username,
            name,
            status : "User"
        })

        res.status(201).send({ message: "User created" })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body
    const targetUser = await db.User.findOne({ where: { username ,status : "User"} })
    if (!targetUser) {
        res.status(400).send({ message: "Username or password is wrong." })
    } else {
        // console.log(targetUser)
        const isPWCorrect = bc.compareSync(password, targetUser.password)
        if (isPWCorrect) {
            const payload = { id: targetUser.id, name: targetUser.name ,status : "const [state, dispatch] = useReducer(reducer, initialState, init)"};
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 36000 })

            res.status(200).send({
                message: "Successfully login",
                access_token: token,
                accessToken: token
            })
        } else {
            res.status(400).send({ message: "Username or password is wrong." })
        }
    }
}

const getPerson = async (req, res) => {
    const person = await db.User.findAll()
    if (person) {
        res.status(201).send(person)
    } else {
        res.status(401).send(error)
    }
}

const deletePerson = async (req, res) => {
    const { id } = req.params
    const targetPerson = await db.User.findOne({where : {id}})
    console.log(targetPerson)
    if(targetPerson){
        await targetPerson.destroy()
        res.status(201).send({message : `${id} deleted`})
    }else{
        res.status(400).send({message : 'not found'})
    }
}

const registerForAdmin = async (req, res) => {
    const { username, password, name } = req.body
    const targetUser = await db.User.findOne({ where: { username }})

    if (targetUser) {
        res.status(400).send({ message: "Username already used" })
    } else {
        const salt = bc.genSaltSync(Number(process.env.ROUND))
        const hashedPW = bc.hashSync(password, salt)

        await db.User.create({
            password: hashedPW,
            username,
            name,
            status : "Admin"
        })

        res.status(201).send({ message: "User created" })
    }
}

const loginForAdmin = async (req, res) => {
    const { username, password } = req.body
    const targetUser = await db.User.findOne({ where: { username ,status : "Admin"} })
    if (!targetUser) {
        res.status(400).send({ message: "Username or password is wrong." })
    } else {
        // console.log(targetUser)
        const isPWCorrect = bc.compareSync(password, targetUser.password)
        if (isPWCorrect) {
            const payload = { id: targetUser.id, name: targetUser.name ,status : "admin"};
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 36000 })

            res.status(200).send({
                message: "Successfully login",
                access_token: token,
                accessToken: token
            })
        } else {
            res.status(400).send({ message: "Username or password is wrong." })
        }
    }
}

module.exports = {
    
    register,
    login,
    getPerson,
    deletePerson,
    registerForAdmin,
    loginForAdmin
}