const usersSettings = require('./../database/users_fav_settings');

module.exports = {
  getSettings (req, res) {
    const userIdToSearch = JSON.parse(req.params.id);
    let settings = usersSettings.find((user) => user.id === userIdToSearch)
    if (settings) {
      res.send(settings)
    } else {
      res.send('user settings wasent found')
    }
  }
};
