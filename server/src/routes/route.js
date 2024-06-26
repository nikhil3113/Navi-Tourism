const express = require('express');

const cityController = require('../controller/cityController');
const locationController = require('../controller/locationController');
const authController = require('../controller/userController');
const passport = require('passport');

const router = express.Router();

//places routes
router.get('/', cityController.getAllCity)
router.post('/add', cityController.createCity)
router.delete('/delete/:id', cityController.deleteCity)
router.put('/update/:id', cityController.updateCity)
router.get('/:id', cityController.getCityById)

//location   
router.post('/location/add', locationController.createLocation) 
router.get('/location/sorted', locationController.locationSortedByLikes)
router.get('/location/:id', locationController.getLocation) //!id = cityId
router.get('/locationDetails/:id', locationController.getLocationDetails)
router.put('/location/update/:id', locationController.updateLocation)
router.delete('/location/delete/:id', locationController.deleteLocation )
router.get('/city/:id/locationCount', locationController.getLocationCountForCity)
router.put('/locationLikes/:id', locationController.locationLikes)
router.put('/locationUnlike/:id', locationController.locationUnlike)


//user
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/user', passport.authenticate('jwt', { session: false }), authController.getUser)

module.exports = router;