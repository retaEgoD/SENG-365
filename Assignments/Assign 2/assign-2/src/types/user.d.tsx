type User = {
    /**
    * User id as defined by the database.
    */
    id: number,
    /**
     * User email as entered when created.
     */
    email: string,
    /**
     * User first name as entered when created.
     */
    firstName: string,
    /**
     * User last name as entered when created.
     */
    lastName: string,
    /**
     * Name of the file of the user profile picture.
     */
    imageFilename: string,
    /**
     * Hash of user password.
     */
    password: string,
    /**
     * User auth token generated when logging in.
     */
    authToken: string
}