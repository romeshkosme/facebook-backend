//  import AuthFacade from "../facades/AuthFacade"
 const AuthFacade = require("../facades/AuthFacade")

 class AuthController {
    constructor(){
        this.authFacade = new AuthFacade()
        this.register = this.register.bind(this)
        this.login = this.login.bind(this)
        this.hello = this.hello.bind(this)
    }
    hello(req, res){
        this.authFacade.hello(req.body)
        .then(data => {
            res.status(data.code).json(data.response);
        })
        .catch(err => {
            res.status(err.code).json(err.response)
        });
    }

    register(req, res){
        this.authFacade.register(req.body)
        .then(data => {
            res.status(data.code).json(data.response);
        })
        .catch(err => {
            res.status(err.code).json(err.response)
        });
    }

    login(req, res){
        this.authFacade.login(req.body, req)
        .then(data => {
            res.status(data.code).json(data.response);
        })
        .catch(err => {
            res.status(err.code).json(err.response)
        });
    }
 }

 module.exports = new AuthController