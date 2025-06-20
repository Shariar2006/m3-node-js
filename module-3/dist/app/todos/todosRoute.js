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
const filePath = path_1.default.join(__dirname, "../../../db/todo.json");
exports.todosRoute = express_1.default.Router();
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
exports.todosRoute.post('/create-todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority } = req.body;
    const db = yield mongoDB_1.client.db('todosDB');
    const connection = db.collection("todos");
    const todos = connection.insertOne({
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
