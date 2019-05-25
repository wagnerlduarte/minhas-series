import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/';

const apis = {
    loadGenres: () => axios.get('genres'),
    loadSeriesByGenre: (genreName, limit) => axios.get(`series?genre=${genreName}` + (limit ? '&_limit=' + limit : '')),
    loadSeries: (id) => axios.get(`series/${id}`),
    deleteSeries: (id) => axios.delete(`series/${id}`),
    saveSeries: (newSerie) => axios.post('series', newSerie),
    editSeries: (editedSerie) => axios.put(`series/${editedSerie.id}`, editedSerie)
}

export default apis;