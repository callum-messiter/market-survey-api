const express = require('express');
const router = express.Router();
const Survey = require('../models/surveys');

function handleResult(res, err, surveys) {
	if(!err) {
		if(surveys.length < 1) {
			res.sendStatus(404);
		} else {
			res.json(surveys);
		}
	} else {
		res.sendStatus(500);
	}
}

// Redirect requests for '/api/surveys/' to '/api/surveys/all'
router.get('/', (req, res, next) => {
	res.redirect('/api/surveys/all');
});

// Get all surveys
router.get('/all', (req, res, next) => {
	Survey.getAllSurveys((err, surveys) => {
		handleResult(res, err, surveys);
	});
});

// Filter surveys by sector
router.get('/sector/:sector', (req, res, next) => {
	const sector = req.params.sector;
	Survey.getSurveysBySector(sector, (err, surveys) => {
		handleResult(res, err, surveys);
	});
});

// Filter surveys by age group
router.get('/age-group/:ageGroup', (req, res, next) => {
	const ageGroup = req.params.ageGroup;
	Survey.getSurveysByAgeGroup(ageGroup, (err, surveys) => {
		handleResult(res, err, surveys);
	});
});

// Filter surveys by country
router.get('/country/:country', (req, res, next) => {
	const country = req.params.country;
	Survey.getSurveysByCountry(country, (err, surveys) => {
		handleResult(res, err, surveys);
	});
});

// Filter surveys by year
router.get('/year/:year', (req, res, next) => {
	const year = req.params.year;
	Survey.getSurveysByYear(year, (err, surveys) => {
		handleResult(res, err, surveys);
	});
});

// Filtered search using multiple parameters
router.get('/search', (req, res, next) => {
	const queryObject = req.query; // '/surveys/search?sector=sports' => req.query = {sector: 'sports'
	// If there are no queries attached to the route path, redirect to '/surveys/all'
	if(req.originalUrl == '/api/surveys/search') {
		res.redirect('/api/surveys/all');
	} else {
		Survey.filterSurveys(queryObject, (err, surveys) => {
			handleResult(res, err, surveys);
		});
	}
});

module.exports = router;
