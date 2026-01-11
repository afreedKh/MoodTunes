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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const app_config_1 = require("./infrastructure/config/app.config");
const db_config_1 = __importDefault(require("./infrastructure/database/mongoose/db.config"));
const mood_route_1 = __importDefault(require("./presentation/routes/mood.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", mood_route_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const PORT = process.env.PORT || 8000;
        yield (0, db_config_1.default)();
        app.listen(PORT, () => {
            if (process.env.NODE_ENV === "development") {
                console.log(`Server running on ${app_config_1.config.BASE_URL} ✅`);
            }
            else {
                console.log(`Server Started ✅`);
            }
        });
    }
    catch (error) {
        console.error("Server failed to connect! ❌", error.message);
    }
});
startServer();
