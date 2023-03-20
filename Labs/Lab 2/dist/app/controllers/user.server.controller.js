"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.read = exports.create = exports.list = void 0;
const users = __importStar(require("../models/user.server.model"));
const logger_1 = __importDefault(require("../../config/logger"));
const schemas = __importStar(require("../../resources/schemas.json"));
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default({ removeAdditional: 'all', strict: false });
const validate = (schema, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validator = ajv.compile(schema);
        const valid = yield validator(data);
        if (!valid)
            return ajv.errorsText(validator.errors);
        return true;
    }
    catch (err) {
        return err.message;
    }
});
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http(`GET all users`);
    try {
        const result = yield users.getAll();
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500)
            .send(`ERROR getting users ${err}`);
    }
});
exports.list = list;
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http(`GET single user id: ${req.params.id}`);
    const id = req.params.id;
    try {
        const result = yield users.getOne(parseInt(id, 10));
        if (result.length === 0) {
            res.status(404).send('User not found');
        }
        else {
            res.status(200).send(result[0]);
        }
    }
    catch (err) {
        res.status(500).send(`ERROR reading user ${id}: ${err}`);
    }
});
exports.read = read;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.http(`POST create a user with username: ${req.body.username}`);
    const validation = yield validate(schemas.user_register, req.body);
    if (validation !== true) {
        res.statusMessage = `Bad Request: ${validation.toString()}`;
        res.status(400).send();
        return;
    }
    const username = req.body.username;
    try {
        const result = yield users.insert(username);
        res.status(201).send({ "user_id": result.insertId });
    }
    catch (err) {
        res.status(500).send(`ERROR creating user ${username}: ${err}`);
    }
});
exports.create = create;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const username = req.body.username;
    logger_1.default.http(`PUT single user with id and new username: ${id}, ${username}`);
    const validation = yield validate(schemas.user_register, req.body);
    if (validation !== true) {
        res.statusMessage = `Bad request: ${validation.toString()}`;
        res.status(400).send();
        return;
    }
    try {
        const result = yield users.alter(parseInt(id, 10), username);
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(`ERROR updating user ${id}: ${err}`);
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    logger_1.default.http(`DELETE single user: ${id}`);
    try {
        const result = yield users.remove(parseInt(id, 10));
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(`ERROR removing user ${id}: ${err}`);
    }
});
exports.remove = remove;
//# sourceMappingURL=user.server.controller.js.map