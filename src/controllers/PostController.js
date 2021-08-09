import PostFacade from '../facades/PostFacade';

class AuthController {
   constructor(){
       this.postFacade = new PostFacade()
       this.create = this.create.bind(this)
       this.getAll = this.getAll.bind(this)
   }

   create(req, res){
       this.postFacade.create(req.body, req.user)
       .then(data => {
           res.status(data.code).json(data.response);
       })
       .catch(err => {
           res.status(err.code).json(err.response)
       });
   }

   getAll(req, res){
    this.postFacade.getAll(req.user)
    .then(data => {
        res.status(data.code).json(data.response);
    })
    .catch(err => {
        res.status(err.code).json(err.response)
    });
}

}

module.exports = new AuthController