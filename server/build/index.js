"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const clothesRoute_1 = __importDefault(require("./routes/clothesRoute"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
// FAKE RESPONSE WAITING
app.use((req, res, next) => {
    setTimeout(() => next(), 1000);
});
app.use('/api/v1/clothes', clothesRoute_1.default);
const port = 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
