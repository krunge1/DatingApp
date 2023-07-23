const ProfileController = require('../controllers/Profile.controller')

module.exports = app => {
    app.get('/api/datingapp/profiles', ProfileController.findAllProfiles);
    app.get('/api/datingapp/profiles/:id', ProfileController.findProfileById);
    app.post('/api/datingapp/profiles/create', ProfileController.createProfile);
    app.post('/api/datingapp/profiles/update/:id', ProfileController.updateProfile);
    app.post('/api/datingapp/profiles/uploadPhoto/:id', ProfileController.uploadPhoto);
    app.delete('/api/datingapp/profiles/delete/:id', ProfileController.deleteProfile);
}