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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSalesStats = void 0;
const salesStats_service_1 = require("../services/salesStats.service");
const getSalesStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, salesStats_service_1.getSalesStatsDB)();
        res.status(200).json({
            success: true,
            message: "Sales stats retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        const error = err;
        res.status(500).json({
            success: false,
            message: error.message || "Failed to retrieve sales stats",
            error: error,
        });
    }
});
exports.getSalesStats = getSalesStats;
