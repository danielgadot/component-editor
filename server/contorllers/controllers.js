const loginCtrl = require('./login.controller');
const statsCtrl = require('./stats.controller');
const errCtrl = require('./err404.controller');
const usersCtrl = require('./users.controller');
const usersSettingsCtrl = require('./user-settings.controller');

module.exports = {
    loginCtrl,
    statsCtrl,
    errCtrl,
    usersCtrl,
    usersSettingsCtrl,
};
