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
exports.getSalesStatsDB = void 0;
const sales_model_1 = __importDefault(require("../../models/sales.model"));
const getSalesStatsDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sales_model_1.default.aggregate([
        {
            $facet: {
                "Total Sales by Category": [
                    {
                        $group: {
                            _id: "$Category",
                            TotalSales: { $sum: "$TotalSales" },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            CategoryId: "$_id",
                            TotalSales: 1,
                        },
                    },
                ],
                "Top 3 Customers by Total Sales": [
                    {
                        $group: {
                            _id: "$CustomerID",
                            TotalSales: { $sum: "$TotalSales" },
                        },
                    },
                    {
                        $sort: {
                            TotalSales: -1,
                        },
                    },
                    {
                        $limit: 3,
                    },
                    {
                        $project: {
                            _id: 0,
                            CustomerID: "$_id",
                            TotalSales: 1,
                        },
                    },
                ],
                "Daily Sales Trend": [
                    {
                        $group: {
                            _id: "$OrderDate",
                            SalesPerDay: { $sum: "$TotalSales" },
                        },
                    },
                    { $sort: { _id: 1 } },
                    {
                        $project: {
                            _id: 0,
                            Date: "$_id",
                            SalesPerDay: 1,
                        },
                    },
                ],
                "Average Quantity Sold per Order": [
                    {
                        $group: {
                            _id: null,
                            averageQuantity: { $avg: "$Quantity" },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                        },
                    },
                ],
                "Highest Selling Product": [
                    {
                        $group: {
                            _id: "$Product",
                            SellingQuantity: {
                                $sum: "$Quantity",
                            },
                        },
                    },
                    {
                        $sort: {
                            SellingQuantity: -1,
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            ProductName: "$_id",
                            SellingQuantity: 1,
                        },
                    },
                ],
                "Number Of Order Per Category": [
                    {
                        $group: {
                            _id: "$Category",
                            Orders: { $push: "$$ROOT" },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            CategoryName: "$_id",
                            TotalOrders: { $size: "$Orders" },
                        },
                    },
                    { $sort: { TotalOrders: -1 } },
                ],
            },
        },
    ]);
    return result;
});
exports.getSalesStatsDB = getSalesStatsDB;
