import Sales from "../models/sales.model";

export const getSalesStatsDB = async () => {
  const result = await Sales.aggregate(
    [
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
    ],
    { maxTimeMS: 30000 }
  );

  return result;
};
