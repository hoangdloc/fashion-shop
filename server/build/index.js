"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const clothesRoute_1 = __importDefault(require("./routes/clothesRoute"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const appError_1 = __importDefault(require("./utils/appError"));
dotenv_1.default.config({ path: './config.env' });
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json({ limit: '10kb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10kb' }));
app.use((0, cookie_parser_1.default)());
// FAKE RESPONSE WAITING
app.use((req, res, next) => {
    setTimeout(() => next(), 3000);
});
app.use('/api/v1/clothes', clothesRoute_1.default);
app.use('/api/v1/users', userRoutes_1.default);
app.all('*', (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 400));
});
app.use(errorController_1.default);
const port = 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
