"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const tsyringe_1 = require("tsyringe");
Object.defineProperty(exports, "container", { enumerable: true, get: function () { return tsyringe_1.container; } });
const IMongoMoodRepository_1 = require("../infrastructure/database/repositories/IMongoMoodRepository");
// register repository
tsyringe_1.container.register("IMoodRepository", {
    useClass: IMongoMoodRepository_1.IMongoMoodRepository
});
