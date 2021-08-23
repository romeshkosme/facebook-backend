import { authenticateToken } from "../src/middlewares/authenticate"
const AuthController = require("../src/controllers/AuthController")
import PostController from '../src/controllers/PostController';

module.exports = function(app) {
    app.post('/api/register', AuthController.register)
    app.post('/api/verify-user', AuthController.verifyUser)
    app.post('/api/login', AuthController.login)

    app.post('/api/post/create', authenticateToken, PostController.create)
    app.get('/api/post/get-all', authenticateToken, PostController.getAll)
    
    app.post('/hello', authenticateToken, AuthController.hello)
}