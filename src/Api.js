import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://localhost:3001/'
// });

axios.defaults.baseURL = 'http://localhost:3001/';

const apis = {
    loadGenres: () => axios.get('genres'),
    loadSeriesByGenre: (genreName) => axios.get(`series?genre=${genreName}`),
    loadSeries: (id) => axios.get(`series/${id}`),
    deleteSeries: (id) => axios.delete(`series/${id}`),
    saveSeries: (newSerie) => axios.post('series', newSerie),
    editSeries: (editedSerie) => axios.put(`series/${editedSerie.id}`, editedSerie),
}

export default apis;