"use strict";
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
exports.todosRoute = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoDB_1 = require("../../config/mongoDB");
const mongodb_1 = require("mongodb");
const filePath = path_1.default.join(__dirname, "../../../db/todo.json");
exports.todosRoute = express_1.default.Router();
// get all todos
exports.todosRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongoDB_1.client.db('todosDB');
    const connection = db.collection("todos");
    const cursor = yield connection.find({});
    const todos = yield cursor.toArray();
    res.json({
        message: "get all todos",
        todos
    });
}));
// create a todo
exports.todosRoute.post('/create-todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority } = req.body;
    const db = yield mongoDB_1.client.db('todosDB');
    const connection = yield db.collection("todos");
    const todos = yield connection.insertOne({
        title,
        description,
        priority,
        completed: false
    });
    console.log(todos);
    res.json({
        message: 'successfully create a todo',
        data: {
            title,
            description,
            priority,
            completed: false
        }
    });
}));
// get single todo
exports.todosRoute.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongoDB_1.client.db('todosDB');
    const connection = yield db.collection("todos");
    const todos = yield connection.findOne({ _id: new mongodb_1.ObjectId(id) });
    res.json({
        message: "get single todo",
        todos
    });
}));
// delete a todo
exports.todosRoute.delete('/delete-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongoDB_1.client.db('todosDB');
    const connection = yield db.collection("todos");
    const todos = yield connection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
    console.log(todos);
    res.json({
        message: 'successfully deleted a todo',
        todos
    });
}));
