import PostService from "../services/PostService";

class PostFacade {
  create(data, user) {
    return new Promise(async (resolve, reject) => {
      try {
        const postService = new PostService();
        const resp = await postService.insert({
            content: data.content,
            user: user.id
        })
        if (resp) {
          resolve({
            code: 200,
            response: { success: true, result: `Post published` },
          });
        } else {
          resolve({
            code: 400,
            response: { success: false, result: `Something went wrong!` },
          });
        }
      } catch (error) {
        console.log(error);
        resolve({
          code: 200,
          response: { success: true, result: `Blah Blah! Error` },
        });
      }
    });
  }

  getAll(user) {
    return new Promise(async (resolve, reject) => {
      try {
        const postService = new PostService();
        const data = await postService.getAll({user: user.id})
        console.log(" data  :: ", data)
        if (data) {
          resolve({
            code: 200,
            response: { success: true, result: data },
          });
        } else {
          resolve({
            code: 400,
            response: { success: false, result: `Something went wrong!` },
          });
        }
      } catch (error) {
        console.log(error);
        resolve({
          code: 200,
          response: { success: true, result: `Blah Blah! Error` },
        });
      }
    });
  }

  get() {}

  update() {}

  delete() {}
  
}

module.exports = PostFacade;
