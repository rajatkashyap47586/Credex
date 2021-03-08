const userModel = require('../models/user-model');
const organisationModel = require('../models/organisation-model');

class userService {

    async addUser(o_id, u_id, u_name) {
        try {
            let user = new userModel({
                o_id: o_id,
                u_id: u_id,
                u_name: u_name
            });
            return await user.save();
        } catch (err) {
            return err;
        }
    }

    async showAllUser() {
        try {
            return await userModel.find({});
        }
        catch (err) {
            return err;
        }
    }

    async showParticularUser(u_id){
        try{
            return await userModel.find({u_id:u_id});
        }
        catch(err){
            return err;
        }
    }

    async showParticularOrgUser(o_id){
        try{
            return await userModel.find({o_id: o_id});
        }
        catch(err){
            return err;
        }
    }

    async deleteAllUser(){
        try{
            return await userModel.remove({});
        }
        catch(err){
            return err;
        }
    }

    async deleteParticularUser(u_id){
        try{
            return await userModel.remove({u_id:u_id});
        }
        catch(err){
            return err;
        }
    }

    async deleteParticularOrgUser(o_id){
        try{
            return await userModel({o_id})
        }
        catch(err){
            return err;
        }
    }

    async updateUser(u_id, u_name){
        try{
            let condn = {
                u_id: u_id
            }
            let newValues={
                $set:{u_name:u_name}
            }

            return await userModel.updateOne(condn, newValues,{new: true});
        }
        catch(err){
            return err;
        }
    }
}

module.exports = userService;