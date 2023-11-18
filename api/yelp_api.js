import apiUrl from '../apiConfig'
import axios from 'axios'

// Yelp API

export const getbusinesses = (location, price, category, radius) => {
    console.log('this is locations',location)
	return axios({
		method: 'GET',
		url: apiUrl + '/yelp-data' + `/search?location=${location}&price=${price}&categories=${category}&radius=${radius}`,
		
	})
}
