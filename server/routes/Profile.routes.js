const ProfileController = require('../controllers/Profile.controller');
const fileUploadMiddleware = require('../models/fileUploadMiddleware');

module.exports = app => {
    app.get('/api/datingapp/profiles', ProfileController.findAllProfiles);
    app.get('/api/datingapp/profiles/:id', ProfileController.findProfileById);
    app.get('/api/datingapp/userProfile', ProfileController.findProfileByUserId);
    app.post('/api/datingapp/profiles/create', ProfileController.createProfile);
    app.post('/api/datingapp/profiles/update/:id', ProfileController.updateProfile);
    app.post('/api/datingapp/profiles/uploadPhoto/:id', fileUploadMiddleware, ProfileController.uploadPhoto);
    app.post('/api/datingapp/profiles/removePhoto/:id/uploads\:filename', ProfileController.removePhoto)
    app.post('/api/datingapp/profiles/addFriend/:id/:friendId', ProfileController.addFriend);
    app.post('/api/datingapp/profiles/removeFriend/:id/:friendId', ProfileController.removeFriend);
    app.post('/api/datingapp/profiles/addBlindDate/:friendId/:blindDateId', ProfileController.addBlindDate);
    app.post('/api/datingapp/profiles/removeBlindDate/:id/:blindDateId', ProfileController.removeBlindDate);
    app.delete('/api/datingapp/profiles/delete/:id', ProfileController.deleteProfile);
}