const utils = require('util');

module.exports.sendError = (message="Some error Occurred", res) => {
    res.status(501);
    res.send({ "message": message });
}

module.exports.sendSuccess = (message, res) => {
    res.status(200);
    res.send({ "message": message });
}

module.exports.sendNotAllowed = (data, res) => {
    sendMessage(data, res, 405);
}
let sendMessage = module.exports.sendMessage = (data, res, code) => {
    res.status(code);
    res.send({message:data});
}
