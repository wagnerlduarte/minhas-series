import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const genres = ["Comédia", "Drama", "Ação"];

const apis = {
  loadGenres: () => Promise.resolve({ data: genres }),
  loadSeriesByGenre: (genreName, limit) =>
    axios.get(
      `${baseURL}series?genre=${genreName}` + (limit ? "&_limit=" + limit : "")
    ),
  loadSeries: id => axios.get(`${baseURL}serie/${id}`),
  deleteSeries: id => axios.delete(`${baseURL}serie/${id}`),
  saveSeries: newSerie => axios.post(`${baseURL}serie`, newSerie),
  editSeries: editedSerie =>
    axios.put(`${baseURL}serie/${editedSerie.id}`, editedSerie),
  getUnratedSeries: () => axios.get(`${baseURL}series?rate=0`),
  login: user =>
    axios.post(`${baseURL}login`, {
      identifier: user.email,
      password: user.password
    })
};

export default apis;
