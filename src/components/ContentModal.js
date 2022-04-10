import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { img_500, unavailable, unavailableLandscape } from '../config/config';
import axios from 'axios';
import Carousel from './Carousel';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Button } from '@mui/material';

const style = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: "10px",
    color: "white",

  },
};

export default function BasicModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
    // console.log(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);



  return (
    <div>
      <div onClick={handleOpen} className='flex flex-col w-[200px] bg-card-bg p-[5px] my-[5px] rounded-[10px] hover:bg-white hover:text-black '>{children}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={style.modal}
      >
        <Box sx={style.paper}>
          {

            content && (<div className='flex flex-col justify-between w-full h-full py-[10px] md:justify-around md:flex-row'>
              <img
                src={
                  content.poster_path
                    ? `${img_500}/${content.poster_path}`
                    : unavailable
                }
                alt={content.name || content.title}
                className="hidden w-[38%] rounded-lg object-contain md:flex "
              />

              <img
                src={
                  content.backdrop_path
                    ? `${img_500}/${content.backdrop_path}`
                    : unavailableLandscape
                }
                alt={content.name || content.title}
                className=" flex  rounded-lg object-contain md:hidden"
              />

              <div className='w-[95%] p-2 h-[90%] flex flex-col md:w-[58%] md:p-0 md:h-full '>
                <span className="text-[30px] h-[12%] flex items-center justify-center font-bold whitespace-nowrap">
                  {content.name || content.title} (
                  {(
                    content.first_air_date ||
                    content.release_date ||
                    "-----"
                  ).substring(0, 4)}
                  )
                </span>
                {content.tagline && (
                  <i className="pb-[10px] self-center italic">{content.tagline}</i>
                )}

                <span className="text-xl flex h-[30%] overflow-y-auto p-4 rounded-[20px] text-justify shadow-lg shadow-black">
                  {content.overview}
                </span>

                <div>
                  <Carousel id={id} media_type={media_type} />
                </div>

                <Button
                  variant="contained"
                  startIcon={<YouTubeIcon />}
                  color="secondary"
                  target="__blank"
                  href={`https://www.youtube.com/watch?v=${video}`}
                >
                  Watch the Trailer
                </Button>

              </div>

            </div>)

          }


        </Box>
      </Modal>
    </div>
  );
}
