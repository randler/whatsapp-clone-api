const fs = require('fs');
const allUsersFile = "src/assets/bin/users/users.json";
let allUsersData = fs.readFileSync(allUsersFile);


const getUser = (req, res) => {

    const {userId} = req.body;

    if(!userId) {
        return res.json({
            success: false,
            status: 'error',
            message: 'Missing userId'
        });
    }
    
    const allUsers = JSON.parse(allUsersData);
    const user = allUsers.find(user => user.id === userId);

    if(!user) {
        return res.json({
            success: false,
            status: 'error',
            message: 'User not found'
        });
    }

    return res.json({
        success: true,
        status: 'ok',
        user
    });
}


module.exports = {
    getUser
};