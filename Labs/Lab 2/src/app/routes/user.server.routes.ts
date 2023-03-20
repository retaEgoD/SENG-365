import {Express} from "express";
import * as users from '../controllers/user.server.controller';

module.exports = ( app: Express ) => {
    // Defines the HTTP methods for certain routes (I think)

    app.route( '/api/users' )
        .get( users.list )
        .post( users.create );

    app.route( '/api/users/:id' )
        .get( users.read )
        .put( users.update )
        .delete( users.remove );
};