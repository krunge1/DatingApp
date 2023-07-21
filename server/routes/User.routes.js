const UserController = require('../controllers/User.controller')

module.exports = app => {
    // app.post('api/login', UserController.login)
    app.post('api/register', UserController.registerUser)
    // app.post('api/logout', UserController.logout)
}