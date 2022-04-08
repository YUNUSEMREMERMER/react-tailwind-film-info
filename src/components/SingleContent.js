import React from 'react'
import { img_300, unavailable } from '../config/config'
import Badge from '@mui/material/Badge';


function SingleContent({id, poster, title, date, media_type, vote_average}) {
  return (
    <div  className='flex flex-col w-[200px] bg-card-bg p-[5px] my-[5px] rounded-[10px] hover:bg-white hover:text-black '>
        <Badge badgeContent={vote_average} color={vote_average > 6 ? "primary" : "secondary"}></Badge>
        <img className='rounded-[10px]' src={poster ? `${img_300}/${poster}` : unavailable} alt='title'/>
        <b className='font-semibold text-center w-full text-lg py-2'>{title}</b>
        <div className='flex items-center justify-between px-[2px] pb-[3px]'>
            <span>{media_type === "tv" ? "TV Series" : "Movie"}</span>
            <span>{date}</span>
        </div>
    </div>
  )
}

export default SingleContent