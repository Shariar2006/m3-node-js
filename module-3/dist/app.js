"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todosRoute_1 = require("./app/todos/todosRoute");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/todos", todosRoute_1.todosRoute);
exports.default = app;
