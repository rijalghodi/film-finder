import { populateGenreDropdown, getRandomMovie, displayMovie, getSelectedGenre, clearCurrentMovie, likeBtn, dislikeBtn } from "./helpers.js";

const tmdbKey = "a0327554c5e440c902f70b2a9141b056";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
  const genreRequestEndpoint = "/genre/movie/list";
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  console.log(urlToFetch);

  try {
    const response = await fetch(urlToFetch);
    if (response.ok == true) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const genres = jsonResponse.genres;
      console.log(genres);
      // populateGenreDropdown(genres);
      return genres;
    }
    throw new Error("Request failed");
  } catch (error) {
    console.log(error);
  }
};

/*------------------------------------
 Get Movie
 ------------------------------------*/
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = "/discover/movie";
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok == true) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const movies = jsonResponse.results;
      console.log(movies);
      return movies;
    }
    throw new Error("Request failed");
  } catch (error) {
    console.log(error);
  }
};

//////////////////////////////////////////////
// Get Movie Info
const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  console.log(urlToFetch);

  try {
    const response = await fetch(urlToFetch);
    if (response.ok == true) {
      const movieInfo = await response.json();
      console.log(movieInfo);
      return movieInfo;
    }
    throw new Error("Request failed");
  } catch (error) {
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
export const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

const likeDislikeMovie = () => {
  clearCurrentMovie();
  showRandomMovie();
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
likeBtn.onclick = likeDislikeMovie;
dislikeBtn.onclick = likeDislikeMovie;
