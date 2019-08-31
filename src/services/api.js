import axios from 'axios';

// const baseURL = 'http://localhost:3001/';
const baseURL = '';//'http://192.168.99.100:3001/';
const strapiURL = 'http://localhost:1337/';

const genres = ['Comédia', 'Drama', 'Ação'];

const apis = {
    // loadGenres: () => axios.get(`${baseURL}genres`),
    loadGenres: () => Promise.resolve({ data: genres }),
    loadSeriesByGenre: (genreName, limit) => axios.get(`${baseURL}series?genre=${genreName}` + (limit ? '&_limit=' + limit : '')),
    loadSeries: (id) => axios.get(`${baseURL}serie/${id}`),
    deleteSeries: (id) => axios.delete(`${baseURL}serie/${id}`),
    saveSeries: (newSerie) => axios.post(`${baseURL}serie`, newSerie),
    editSeries: (editedSerie) => axios.put(`${baseURL}serie/${editedSerie.id}`, editedSerie),
    getUnratedSeries: () => axios.get(`${baseURL}series?rate=0`),
    login: (user) => axios.post(`${strapiURL}auth/local`, { identifier: user.email, password: user.password }),
    callbackProvider: (provider, search) => axios.get(`${strapiURL}auth/${provider}/callback${search}`)
}

export default apis;