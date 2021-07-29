const API_KEY = process.env.REACT_APP_API_KEY;

export const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/original/';
export const BACKDROP_SIZE = 'w1280';
export const POSTER_SIZE = 'w780';
export const PROFILE_SIZE = 'h632'

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchAmazonOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=9`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchByGenre: `/discover/movie?api_key=${API_KEY}&with_genres=`,
    fetchGenres: `/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    fetchPopularTvShows: `discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`
};

export default requests;