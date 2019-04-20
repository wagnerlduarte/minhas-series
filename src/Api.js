import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/'
});

const apis = {
    loadGenres: () => api.get('genres'),
    loadSeriesByGenre: (genreName) => api.get(`series?genre=${genreName}`),
    loadSeries: (id) => api.get(`series/${id}`),
    deleteSeries: (id) => api.delete(`series/${id}`),
    saveSeries: (newSerie) => api.post('series', newSerie),
    editSeries: (editedSerie) => api.put(`series/${editedSerie.id}`, editedSerie),
}

export default apis;