"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SalesSchema = new mongoose_1.Schema({
    OrderID: { type: Number, required: true },
    CustomerID: { type: String, required: true },
    Product: { type: String, required: true },
    Category: { type: String, required: true },
    Quantity: { type: Number, required: true },
    UnitPrice: { type: Number, required: true },
    TotalSales: { type: Number, required: true },
    OrderDate: { type: String, required: true },
});
const Sales = (0, mongoose_1.model)("sales", SalesSchema);
exports.default = Sales;
