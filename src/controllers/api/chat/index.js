const fs = require('fs');
const bcrypt = require('bcryptjs');
const allChatsJsonFile = "src/assets/bin/chats/chats.json";
const activeChatsJsonFile = "src/assets/bin/chats/active.json";
let allChatsData = fs.readFileSync(allChatsJsonFile);
let activeChatsData = fs.readFileSync(activeChatsJsonFile);
const jwt = require('jsonwebtoken');


const getAllChats = (req, res) => {

    const {chatId} = req.body;
    const {userId} = req;

    if(!chatId) {
        return res.json({
            success: false,
            status: 'error',
            message: 'Missing chatId'
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
        return res.json({
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

    const { userId } = req;

    const activeChats = JSON.parse(activeChatsData);
    const active = activeChats.find(chat => chat.userId === userId);

    if(!active) {
        return res.json({
            success: false,
            status: 'error',
            message: 'Active Chats not found'
        });
    }

    return res.json({
        success: true,
        status: 'ok',
        active
    });
}


module.exports = {
    getActiveChats,
    getAllChats
};