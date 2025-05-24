import Axios from 'axios'

const BASE_URL = import.meta.env.MODE === 'production' ? '/api/' : '//localhost:3030/api/'

const axios = Axios.create({ withCredentials: true, baseURL: BASE_URL })

export async function getCounter() {
	try {
		const response = await axios.get(`counter`)
		return response.data.data.value
	} catch (error) {
		console.error('Error fetching counter:', error)
		throw error
	}
}

export async function incrementCounter() {
	try {
		const response = await axios.post(`counter/increment`)
		return response.data
	} catch (error) {
		console.error('Error updating counter:', error)
		throw error
	}
}

export async function setOnceCounter(counter) {
	try {
		const response = await axios.post(`counter/set-once`, counter)
		console.log('🚀 ~ setOnceCounter ~ response.data:', response.data)
		return response.data
	} catch (error) {
		console.error('Error setting counter:', error)
		throw error
	}
}

export async function getDashboard() {
	try {
		const response = await axios.get(`counter/dashboard`)
		return response.data
	} catch (error) {
		console.error('Error getting metrics:', error)
		throw error
	}
}
