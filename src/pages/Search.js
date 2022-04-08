import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from 'axios';
import SingleContent from "../components/SingleContent"
import CustomPagination from "../components/CustomPagination"

function Search() {

  const [value, setValue] = useState("one");
  const [searchText, setSearchText] = useState();
  const [page, setPage] = useState();
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme({
      palette: {
          mode: 'dark',
          primary: {
            main: "#fff",
          },
      },
  });

  

  const handleChange = (event,newValue) => {
    setValue(newValue);
    setPage(1);
  };

  const fetchSearch = async() => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/search/${value === "two" ? "tv" : "movie"}?api_key=${
      process.env.REACT_APP_API_KEY
    }&language=en-US&query=${searchText}&page=${page}&include_adult=false`);

    setContent(data.results);
    setNumOfPages(data.total_pages);
  }

  useEffect(() => {
    window.scroll(0, 0);
    searchText && fetchSearch();
    // eslint-disable-next-line
  },[value, page])


  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div className='flex gap-x-2 pt-4  '>
          <TextField className='w-full' id="outlined-basic" label="Search" variant="outlined" onChange={(e) => setSearchText(e.target.value)} />
          <Button variant="contained" onClick={() => fetchSearch()}><SearchIcon/></Button>
        </div>
        <Box sx={{ width: '100%' }} className="pt-4">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
            centered
          >
            <Tab
              value="one"
              label="SEARCH MOVIES"
              sx={{ width: '100%' }} 
              wrapped
            />
            <Tab value="two" sx={{ width: '100%' }}  label="SEARCH TV SERIES" />
          </Tabs>
        </Box>
      </ThemeProvider>

      <div className="flex flex-wrap justify-around gap-x-5">
          {content &&
            content.map((c) => (
              <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={value === "two" ? "tv" : "movie"}
                vote_average={c.vote_average}
              />
            ))}
          {searchText && (!content && (value === "two" ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>))}
      </div>

      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    
    </>
    

    

  )
    
    
  }

export default Search