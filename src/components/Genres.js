import { Chip } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Genres({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage}) {
    
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: "#fff",
              },
        },
    });

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    };
        
    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    };
    
    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        setGenres(data.genres);
    
    };

    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres({});
        };//eslint-disable-next-line
    },[])

  return (
    <ThemeProvider theme={darkTheme}>
        <div className='py-2 px-3'>
            {
                selectedGenres && selectedGenres.map((genre) => <Chip  label={genre.name} color="success" style={{margin:"2px"}} size="small" key={genre.id} clickable onDelete={() => handleRemove(genre)} />)
            }
            {
                genres && genres.map((genre) => <Chip  label={genre.name} style={{margin:"2px"}} size="small" key={genre.id} clickable onClick={() => handleAdd(genre) } />)
            }
        </div>

    </ThemeProvider>
    
  )
}

export default Genres