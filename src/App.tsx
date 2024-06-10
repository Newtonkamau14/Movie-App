import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./assets/search.svg";
import MovieCard from "./components/MovieCard";
import { Movie } from "./components/MovieCard";

const API_URL = `https://www.omdbapi.com?apikey=${process.env.OMDB_API_KEY}`;



function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm,setSearchTerm] = useState('')
   const searchMovies = async (title: string) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search)
    setMovies(data.Search);
    if (!process.env.OMDB_API_KEY) {
      console.error("OMDB API key is not set");
      return;
    }

    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };


  useEffect(() => {
    searchMovies("Pirates");
  }, []);
  return (
    <>
      <div className="app">
        <h1>Movie App</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
        </div>
        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie}/>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
