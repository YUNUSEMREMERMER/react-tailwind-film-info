const useGenre = (selectedGenres) => {
    if( selectedGenres.length < 1 ) return "";

    const genresIds = selectedGenres.map((genre) => genre.id);
    return genresIds.reduce((acc, curr) => acc + "," + curr);
};

export default useGenre;