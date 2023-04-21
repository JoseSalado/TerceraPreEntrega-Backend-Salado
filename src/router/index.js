import productsController from '../controllers/products.controller.js'
import cartsController from '../controllers/carts.controller.js'
import messageController from '../controllers/messages.controller.js'
import usersController from '../controllers/users.controller.js'
import viewsTemplateController from '../controllers/viewsTemplate.controller.js'
import authController from '../controllers/controller.auth.js'

const router = (app) => {
    app.use('/api/products', productsController)
    app.use('/api/carts', cartsController)
    app.use('/', messageController)
    app.use('/api/users', usersController)
    app.use('/', viewsTemplateController)
    app.use('/api/auth', authController)
}

export default router