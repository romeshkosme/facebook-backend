import Service from './Service';
import PostModel from '../models/Post';

class PostService extends Service {
    constructor() {
        super(PostModel)
    }
}

export default PostService;