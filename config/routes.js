import { authenticateToken } from "../src/middlewares/authenticate"
const AuthController = require("../src/controllers/AuthController")
import PostController from '../src/controllers/PostController';

module.exports = function(app) {
    app.post('/register', AuthController.register)
    app.post('/login', AuthController.login)

    app.post('/post/create', authenticateToken, PostController.create)
    app.get('/post/get-all', authenticateToken, PostController.getAll)
    
    app.post('/hello', authenticateToken, AuthController.hello)
}