const apiConfig = {
    baseUrl:'https://api.themoviedb.org/3/',
    apiKey:'be158f9d4acae75dcbdfe45cee9c80a5',
    originalImage:(imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;