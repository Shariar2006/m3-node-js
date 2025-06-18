"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const filePath = path_1.default.join(__dirname, "../db/todo.json");
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/todos', (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    console.log(data);
    res.json(data);
});
app.post('/todos/create-todo', (req, res) => {
    const data = req.body;
    console.log(data);
    res.send('hello world');
});
exports.default = app;
