import Service from './Service';
import UserModel from '../models/User';

class UserService extends Service {
    constructor() {
        super(UserModel)
    }
}

export default UserService;