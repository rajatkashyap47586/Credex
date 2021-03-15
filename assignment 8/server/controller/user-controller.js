const uService = require('../services/user-service');

const userService = new uService();

class userController{

    async fetchStatus(req,res)
    {
        await userService.prepareReadingFile();
        let result = await userService.fetchData();
        console.log("resulttttt------",result);
        let changeInNumber = userService.updateCount(result.length);
        let status = userService.getStatus(result, changeInNumber);
        res.send(status);
    }

}

module.exports = userController;