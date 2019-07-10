import * as jwt from 'jsonwebtoken'

import { secret } from '../../config'
const model = require('./model')

module.exports = {
  login: (req: any, res: any) => {
    model.findOne({ email: req.body.email }, async (err: any, user: any) => {
      if (err || !user) {
        res.status(500).send({ msg: 'Email or Password did not match'})
        return false
      }

      const isMatch = await user.comparePassword(user.password, req.body.password)

      if (!isMatch) {
        res.status(500).send({ auth: false, msg: 'Email or Password did not match'})
        return false
      }

      const token = jwt.sign({ id: user._id }, secret, { expiresIn: 86400 })
      res.status(200).send({ auth: true, token})
    })

  },
  register: (req: any, res: any) => {
    const newUser = new model({
      forename: req.body.forename,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password,
    })

    newUser.save()
      .then((result: any) => {
        console.log(result)
        res.status(200).send({ msg: 'Register Successful', user_id: result._id })
      })
      .catch((e: any) => {
        console.log(e)
        res.status(500).send({ msg: 'Register Unsuccessful' })
      })
  }
}
