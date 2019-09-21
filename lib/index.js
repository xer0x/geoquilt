const geocoder = require('./geocoder')

const api_key = process.env.GOOGLE_GEOCODER_KEY

const {lookup} = geocoder(api_key);
