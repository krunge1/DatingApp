const UserController = require('../controllers/User.controller')

module.exports = app => {
    app.post('/api/datingapp/register', UserController.registerUser)
    app.post('/api/datingapp/login', UserController.loginUser)
    app.post('/api/datingapp/logout', UserController.logout)
}