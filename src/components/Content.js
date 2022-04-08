import React from 'react'
import { Routes, Route } from "react-router-dom";
import Trending from "../pages/Trending"
import Movies from "../pages/Movies"
import Series from "../pages/Series"
import Search from "../pages/Search"

function Content() {
  return (
    <div className='container mx-auto pt-[88px] max-w-7xl pb-16'>
        <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/Series" element={<Series />} />
            <Route path="/search" element={<Search />} />
        </Routes>


    </div>
  )
}

export default Content