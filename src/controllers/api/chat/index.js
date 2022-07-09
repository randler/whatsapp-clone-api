const fs = require('fs');
const bcrypt = require('bcryptjs');
const allChatsJsonFile = "src/assets/bin/chats/chats.json";
const activeChatsJsonFile = "src/assets/bin/chats/active.json";
let allChatsData = fs.readFileSync(allChatsJsonFile);
let activeChatsData = fs.readFileSync(activeChatsJsonFile);
const jwt = require('jsonwebtoken');


const getAllChats = (req, res) => {

    const {userId, chatId} = req.body;

    if(!chatId || !userId) {
        return res.status(400).json({
            success: false,
            status: 'error',
            message: 'Missing userId or chatId'
        });
    }
    
    const allChats = JSON.parse(allChatsData);
    let chatResponse = {};
    const chat = allChats.find(chat =>{
        if(chat.userId === userId) {
            if(chatResponse = chat.chats.find(converstaion => converstaion.id === chatId)) {
                return true;
            }
        }
    });

    if(!chat) {
        return res.status(400).json({
            success: false,
            status: 'error',
            message: 'Chat not found'
        });
    }

    return res.json({
        success: true,
        status: 'ok',
        chatResponse
    });
}

const getActiveChats = (req, res) => {
    res.json({
        success: true,
        status: 'ok',
        data: activeChatsData
    });
}


module.exports = {
    getActiveChats,
    getAllChats
};