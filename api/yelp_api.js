import apiUrl from '../apiConfig'
import axios from 'axios'

// Yelp API

export const getbusinesses = (location, price, category, radius) => {
    console.log('filter',location,price,category,radius)
	return axios({
		method: 'GET',
		url: apiUrl + '/yelp-data' + `/search?location=${location}&price=${price}&term=${category}&radius=${radius}`,
		
	})
}
