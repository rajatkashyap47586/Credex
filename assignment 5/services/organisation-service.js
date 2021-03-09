const organisationModel = require('../models/organisation-model');
const Service = require('./user-service');
const userService = new Service();

class organisationService{

    async addOrganisation(o_id, o_name){
        try{
            let org = new organisationModel({
                o_id: o_id,
                o_name: o_name
            });
            return await org.save();
        }
        catch(err){
            return err;
        }
    }

    async showAllOrganisation(){
        try{
            return await organisationModel.find({});
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

    async showparticularOrganisation(o_id){
        try{
            return await organisationModel.findOne({o_id:o_id});
        }
        catch(err){
            return err;
        }
    }

    async deleteAllOrganisation(){
        try{
            await organisationModel.remove({});
            return await userService.deleteAllUser();
        }
        catch(err){
            return err;
        }
    }

    async deleteParticularOrg(o_id){
        try{
            await organisationModel.remove({o_id: o_id});
            return await userService.deleteParticularOrgUser(o_id);
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

    async updateOrganisation(o_id, o_name)
    {
        try{
            let condn = { o_id: o_id };
            let newValue = {$set:{ o_name: o_name }};
            return await organisationModel.updateOne(condn, newValue,{new: true});
        }
        catch(err){
            return err;
        }
    }

}

module.exports = organisationService;