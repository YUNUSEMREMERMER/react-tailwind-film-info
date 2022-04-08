import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate  } from "react-router-dom"


function BottomBar() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate ();

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: "#fff",
          },
        },
      });

    useEffect(() => {
        if(value === 0){
            navigate("/", { replace: true })
          }
          else if(value === 1){
            navigate("/movies", { replace: true })
          }
          else if(value === 2){
            navigate("/series", { replace: true })
          }
          else if(value === 3){
            navigate("/search", { replace: true })
          }
          //eslint-disable-next-line
    },[value])

    

  return (
    <div>
        <ThemeProvider theme={darkTheme}>
            <Box sx={{ width: 500 }}>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex:20}} elevation={3}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                        
                    >
                        <BottomNavigationAction label="Trending" icon={<WhatshotIcon/>} />
                        <BottomNavigationAction label="Movies" icon={<MovieCreationIcon/>} />
                        <BottomNavigationAction label="TV Series" icon={<TvIcon/>} />
                        <BottomNavigationAction label="Search" icon={<SearchIcon/>} />
                    </BottomNavigation>
                </Paper>
            </Box>

        </ThemeProvider>
        
    </div>
  )
}

export default BottomBar