const fs = require('fs');
const bcrypt = require('bcryptjs');
let rawdata = fs.readFileSync('src/assets/bin/users/users.json');
const jwt = require('jsonwebtoken');

const usersJsonFile = "src/assets/bin/users/users.json";

const login = (req, res) => {
    let {phone, password} = req.body;
    
    let users = JSON.parse(rawdata);
    if(phone.includes('+'))
        phone = phone.replace('+', '');
    const user = users.find(user => user.phone === phone);
    if(user && bcrypt.compareSync(password, user.password)) {
        const { id } = user;
        // generate token withou expires
        const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '9999 years'});
        
        users.map(user => {
            if(user.id === id) {
                user.token = token;
                user.vefiryed = true;
            }
        });
        fs.writeFileSync(usersJsonFile, JSON.stringify(users));

        return res.json({
            success: true,
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
            user.vefiryed = false;
            finded = true;
        }
    });

    if(finded) {
        fs.writeFileSync(usersJsonFile, JSON.stringify(users));
        return res.json({
            success: false,
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
            success: true,
            token: ''
        });
    } else {
        res.json({message: 'User already exists'});
    }
}

const verifyToken = (req, res) => {
    res.json({
        success: true
    });
}

const generatePin = (req, res) => {
    const {phone} = req.body;
    let users = JSON.parse(rawdata);
    const user = users.find(user => user.phone === phone);
    if(user) {
        
        const { id } = user;
        
        const password = generatePinVerify();
        const hashPassword = bcrypt.hashSync(password.toString(), 10);
        
        users.map(user => {
            if(user.id === id) {
                user.token = '';
                user.password = hashPassword;
                user.vefiryed = false;
            }
        });
        fs.writeFileSync(usersJsonFile, JSON.stringify(users));
        return res.json({
            success: true,
            pin: password
        });
    }
}

const generatePinVerify = () => {
    //generate 4 digit pin
    return Math.floor(1000 + Math.random() * 9000);
}

module.exports = {
    login,
    register,
    generatePin,
    verifyToken,
    logout
};