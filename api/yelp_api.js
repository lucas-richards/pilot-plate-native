import apiUrl from '../apiConfig'
import axios from 'axios'

// Yelp API

export const getbusinesses = (location, latitude, longitude, price, category, radius) => {
    console.log('filter',location,latitude,longitude,price,category,radius)
	return axios({
		method: 'GET',
		url: apiUrl + '/yelp-data' + `/search?location=${location}&latitude=${latitude}&longitude=${longitude}&price=${price}&term=${category}&radius=${radius}`,
		
	})
}
