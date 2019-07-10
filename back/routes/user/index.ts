const userRouter = require('express').Router()
const controller = require('./controller')

userRouter.post('/login', controller.login)
userRouter.post('/register', controller.register)

export { userRouter }
