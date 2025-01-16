import { model, Schema } from "mongoose";
import Sales from "../interfaces/seles.interface";

const SalesSchema = new Schema<Sales>({
  OrderID: { type: Number, required: true },
  CustomerID: { type: String, required: true },
  Product: { type: String, required: true },
  Category: { type: String, required: true },
  Quantity: { type: Number, required: true },
  UnitPrice: { type: Number, required: true },
  TotalSales: { type: Number, required: true },
  OrderDate: { type: String, required: true },
});

const Sales = model<Sales>("sales", SalesSchema);

export default Sales;
