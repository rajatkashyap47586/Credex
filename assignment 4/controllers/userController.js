const userModel = require('../models/userModel');

class UserController {

    //show all the user data
    async userList() {
        try {
            let result = await userModel.find({})
            return result;
        }
        catch (err) {
            console.log("error occured while fetching all the data", err);
            return err;
        }
    }

    //show specified user data
    async listUser(rollno) {
        try {
            let result = await userModel.findOne({ rollno: rollno });
            return result;
        } catch (err) {
            console.log("Error occured while fetching the data of rollno =", rollno, err);
            return err;
        }
    }

    //add the user
    async addUser(obj) {
        try {
            let user = new userModel({
                rollno: obj.rollno,
                name: obj.name
            })
            let result = await user.save(user)
            return result;
        }
        catch (err) {
            console.log("error occured while adding the user ", err);
            return err;
        }
    }

    //delete the user
    async deleteUser(rollno) {
        try {
            let result = await userModel.deleteOne({ rollno: rollno });
            return result;
        }
        catch (err) {
            console.log("error occured while deleting the user ", err);
            return err;
        }
    }
}

module.exports = UserController;