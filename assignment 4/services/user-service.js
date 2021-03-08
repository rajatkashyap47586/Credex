const userModel = require('../models/userModel');

class UserService {

    //show all user data service method
    async userList() {
        try {
            let users = await userModel.find({});
            return users;
        }
        catch (err) {
            return err;
        }
    }

    //show particular user data service method
    async showUser(id) {
        try {
            let user = await userModel.findOne({ id: id });
            return user;
        } catch (err) {
            return err;
        }
    }

    //add particular user service method
    async addUser(id, name) {
        try {
            let user = new userModel({
                id: id,
                name: name
            })
            let result = await user.save(user)
            return result;
        }
        catch (err) {
            return err;
        }
    }

    //delete particular user service method
    async deleteUser(id) {
        try {
            let result = await userModel.deleteOne({ id: id });
            return result;
        }
        catch (err) {
            return err;
        }
    }
}

module.exports = UserService;