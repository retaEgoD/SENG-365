type DetailedFilm = {
    /**
    * Film id as defined by the database.
    */
    filmId: number,
    /**
     * Title of film as entered when created.
     */
    title: string,
    /**
     * Id of genre of the film.
     */
    genreId: number,
    /**
     * Age rating of the film.
     */
    ageRating: string
    /**
     * Id of director of the film.
     */
    directorId: number,
    /**
     * First name of director of the film.
     */
    directorFirstName: string
    /**
     * Last name of director of the film.
     */
    directorLastName: string
    /**
     * Rating of the film
     */
    rating: number
    /**
     * Release date of film as entered when created.
     */
    releaseDate: string,
    /**
     * Description of film as entered when created.
     */
    description: string,
    /**
     * Runtime/length of film.
     */
    runtime: number,
    /**
     * Number of ratings of the film
     */
    numRatings: number
}