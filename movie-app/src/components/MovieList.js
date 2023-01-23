import React from 'react';

const MovieList = (props) => {
    const listComponent = props.listComponent;

	return (
		<div className='col d-flex m-3'>
			{props.movies.map((movie, index) => (
				<div 
					key={index}
					 className='image-container justify-content-start m-3'>
					<img src={movie.Poster} alt='movie'></img>
                    <div 
                    onClick={() => props.handleMyListClick(movie)}
                    className='overlay d-flex align-items-center justify-content-center'>
                        {listComponent}
                    </div>
				</div>
			))}
		</div>
	);
};

export default MovieList;