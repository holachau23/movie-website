import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddToList from './components/AddToList';
import RemoveFromList from './components/RemoveFromList';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');
  const [myList, setMyList] = useState([])

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=b7871f84`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

  useEffect(() => {
    const movieList = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );

    setMyList(movieList)
  }, [])

  useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));

  };

  const addToList = (movie) => {
    const newList = [...myList, movie];
    
    setMyList(newList);
    saveToLocalStorage(newList);
  }

  const removeFromList = (movie) => {
    const newList = myList.filter((fav) => fav.imdbID !== movie.imdbID);
    
    setMyList(newList);
    saveToLocalStorage(newList);
  }

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<MovieList 
          movies={movies} 
          listComponent={<AddToList/>} 
          handleMyListClick={addToList}/>
			</div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='My List' />
			</div>
      <div className='row'>
				<MovieList 
          movies={myList} 
          listComponent={<RemoveFromList/>}
          handleMyListClick={removeFromList}/>
			</div>
		</div>
	);
};

export default App;
