type Review = {
    /**
    * User id of reviewer.
    */
    reviwerId: number,
    /**
    * Review's rating of the film.
    */
    rating: number,
    /**
     * Textual review of the film. May be null.
     */
    review: string,
    /**
     * First name of reviewer.
     */
    reviewerFirstName: string,
    /**
     * Last name of reviewer.
     */
    reviewerLastName: string,
    /**
     * Timestamp of review posting.
     */
    timestamp: Date,
}