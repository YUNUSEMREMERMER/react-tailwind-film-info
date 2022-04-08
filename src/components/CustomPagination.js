import React from 'react'
import { Pagination } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';


function CustomPagination({setPage, numOfPages = 10}) {

    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
      }
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

  return (
    <ThemeProvider theme={darkTheme}>
        <div style={{ width:"100%", display:"flex", justifyContent:"center" }}>
            <Pagination 
                count={numOfPages} 
                onChange={(e) => handlePageChange(e.target.textContent)} 
                //color="primary" 
                />
        </div>

    </ThemeProvider>
    
  )
}

export default CustomPagination