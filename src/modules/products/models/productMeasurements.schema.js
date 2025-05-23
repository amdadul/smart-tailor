import { int, mysqlTable, serial, tinyint } from "drizzle-orm/mysql-core";
import { products } from "./products.schema.js";

export const productMeasurements = mysqlTable("product_measurements", {
  id: serial("id").primaryKey(),
  productId: int("product_id").references(() => products.id),
  categoryId: int("category_id"),
  categoryType: tinyint("category_type"), // 1 -> main, 2 -> loose
});
