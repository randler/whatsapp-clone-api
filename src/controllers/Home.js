const index = (req, res) => {
    res.render('home');
}

const login = (req, res) => {
    res.render('auth/login');
}

module.exports = {
    index,
    login
};