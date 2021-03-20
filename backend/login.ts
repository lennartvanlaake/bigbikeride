
const processLogin = (request, response) => {
    if (request.body.password != process.env.PASSWORD) {
        return response.status(401).json({ "exception": "wrong password" });
    }
    request.session.loggedIn = true
    return response.status(200).json({ "message": "login success" })
}

const isLoggedIn = (request, response) => {
    if (request.session.loggedIn) {
        return response.status(200).json({ "message": "is logged in" })
    } else {
        return response.status(401).json({ "message": "is not loged in" })
    }
}

module.exports = {
    processLogin,
    isLoggedIn 
}