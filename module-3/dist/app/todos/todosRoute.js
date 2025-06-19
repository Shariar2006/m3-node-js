"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRoute = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const filePath = path_1.default.join(__dirname, "../../../db/todo.json");
exports.todosRoute = express_1.default.Router();
exports.todosRoute.get('/', (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    console.log(data);
    res.json({
        message: "all todos data",
        data
    });
});
exports.todosRoute.post('/create-todo', (req, res) => {
    const data = req.body;
    console.log(data);
    res.send('hello world');
});
