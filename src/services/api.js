import axios from 'axios';

const baseURL = 'http://localhost:3001/'; 
const strapiURL = 'http://localhost:1337/';

const apis = {
    loadGenres: () => axios.get(`${baseURL}genres`),
    loadSeriesByGenre: (genreName, limit) => axios.get(`${baseURL}series?genre=${genreName}` + (limit ? '&_limit=' + limit : '')),
    loadSeries: (id) => axios.get(`${baseURL}series/${id}`),
    deleteSeries: (id) => axios.delete(`${baseURL}series/${id}`),
    saveSeries: (newSerie) => axios.post(`${baseURL}series`, newSerie),
    editSeries: (editedSerie) => axios.put(`${baseURL}series/${editedSerie.id}`, editedSerie),
    getUnratedSeries: () => axios.get(`${baseURL}series?rate=0`),
    login: (user) => axios.post(`${strapiURL}auth/local`, { identifier: user.email, password: user.password })
}

export default apis;