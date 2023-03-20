import * as users from '../models/user.server.model';
import Logger from '../../config/logger';
import * as schemas from '../../resources/schemas.json';
import {Request, Response} from 'express';
import Ajv from 'ajv';
const ajv = new Ajv({removeAdditional: 'all', strict: false});

const validate = async (schema: object, data: any) => {
    try {
        const validator = ajv.compile(schema);
        const valid = await validator(data);
        if(!valid)
            return ajv.errorsText(validator.errors);
        return true;
    } catch (err) {
        return err.message;
    }
}
const list = async (req: Request, res: Response): Promise<void> => {
    Logger.http(`GET all users`);
    try {
            const result = await users.getAll();
            res.status(200).send(result);
        } catch (err) {
            res.status(500)
                .send(`ERROR getting users ${err}`);
        }
};


const read = async (req: Request, res: Response) : Promise<void> => {
    Logger.http(`GET single user id: ${req.params.id}`)
    const id = req.params.id;
    try {
        const result = await users.getOne( parseInt(id, 10) );
        if( result.length === 0 ){
            res.status( 404 ).send('User not found');
        } else {
            res.status( 200 ).send( result[0] );
        }
    } catch( err ) {
        res.status( 500 ).send( `ERROR reading user ${id}: ${ err }` );
    }
};


const create = async (req: Request, res: Response): Promise<void> => {
    Logger.http(`POST create a user with username: ${req.body.username}`)
    const validation = await validate(
        schemas.user_register,
        req.body);
    if (validation !== true) {
        res.statusMessage = `Bad Request: ${validation.toString()}`;
        res.status(400).send();
        return;
    }

    const username = req.body.username;
    try {
        const result = await users.insert(username);
        res.status(201).send({ "user_id": result.insertId });
    } catch (err) {
        res.status(500).send(`ERROR creating user ${username}: ${err}`);
    }
};


const update = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const username = req.body.username;
    Logger.http(`PUT single user with id and new username: ${id}, ${username}`);

    const validation = await validate(
                                      schemas.user_register,
                                      req.body
    );
    if (validation !== true) {
        res.statusMessage = `Bad request: ${validation.toString()}`;
        res.status(400).send();
        return;
    }

    try {
        const result = await users.alter(parseInt(id, 10), username);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(`ERROR updating user ${id}: ${err}`);
    }
};

const remove = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    Logger.http(`DELETE single user: ${id}`);
    try {
        const result = await users.remove(parseInt(id, 10));
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(`ERROR removing user ${id}: ${err}`)
    }
}

export { list, create, read, update, remove }