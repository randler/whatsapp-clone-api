const fs = require('fs');
const bcrypt = require('bcryptjs');
let rawdata = fs.readFileSync('src/assets/bin/users/users.json');
const jwt = require('jsonwebtoken');

const usersJsonFile = "src/assets/bin/users/users.json";

const login = (req, res) => {
    const {phone, password} = req.body;
    
    let users = JSON.parse(rawdata);
    const user = users.find(user => user.phone === phone);
    if(user && bcrypt.compareSync(password, user.password)) {
        const { id } = user;
        // generate token withou expires
        const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        
        users.map(user => {
            if(user.id === id) {
                user.token = token;
            }
        });
        fs.writeFileSync(usersJsonFile, JSON.stringify(users));

        return res.json({
            auth: true,
            token
        });
    } 
    res.json({message: 'Login failed'});
}

const logout = (req, res) => {
    const {id} = req.body;
    let users = JSON.parse(rawdata);
    let finded = false;
    users.map(user => {
        if(user.id === id) {
            user.token = '';
            finded = true;
        }
    });

    if(finded) {
        fs.writeFileSync(usersJsonFile, JSON.stringify(users));
        return res.json({
            auth: false,
            token: ''
        });
    }

    res.json({message: 'Logout failed'});
}

const register = (req, res) => {
    const {name, phone, email, photo, password} = req.body;
    let users = JSON.parse(rawdata);
    const user = users.find(user => user.phone === phone);
    //generate hash password
    const hashPassword = bcrypt.hashSync(password, 10);
    if(!user) {
        users.push({
            id: users.length + 1,
            name,
            phone,
            email,
            hashPassword,
            photo,
            token: ''
        });
        fs.writeFileSync(usersJsonFile, JSON.stringify(users));
        res.json({
            auth: true,
            token: ''
        });
    } else {
        res.json({message: 'User already exists'});
    }
}

module.exports = {
    login,
    register,
    logout
};