import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CustomPagination from '../components/CustomPagination';
import SingleContent from '../components/SingleContent';

function Movies() {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const fetchMovies = async() => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);
    setContent(data.results);
    setNumOfPages(data.total_pages);
  }

  useEffect(() => {
    fetchMovies();
    //eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className='flex items-center justify-center uppercase text-white p-[5px] text-5xl font-thin'>DISCOVER MOVIES</span>
      <div className='flex flex-wrap justify-around gap-x-5'>
        {
          content && content.map((c) => <SingleContent key={c.id} id={c.id} poster={c.poster_path} title={c.title || c.name} date={c.first_air_date || c.release_date} media_type="movie" vote_average={c.vote_average} />)
        }
      </div>
      <CustomPagination setPage={setPage} numOfPages={numOfPages} />
    </div>
  )
}

export default Movies