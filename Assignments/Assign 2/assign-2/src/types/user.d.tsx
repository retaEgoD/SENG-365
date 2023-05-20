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
    first_name: string,
    /**
     * User last name as entered when created.
     */
    last_name: string,
    /**
     * Name of the file of the user profile picture.
     */
    image_filename: string,
    /**
     * Hash of user password.
     */
    password: string,
    /**
     * User auth token generated when logging in.
     */
    auth_token: string
}