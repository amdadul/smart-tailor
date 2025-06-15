import { int, mysqlTable, tinyint } from "drizzle-orm/mysql-core";
import { products } from "../../products/models/products.schema.js";
import { styleCategories } from "../../products/models/styleCategories.schema.js";
import { styleOptions } from "../../products/models/styleOptions.schema.js";
import { orders } from "./orders.schema.js";

export const orderStyles = mysqlTable("order_styles", {
  id: int("id").primaryKey().autoincrement(),
  orderId: int("order_id").references(() => orders.id),
  productId: int("product_id").references(() => products.id),
  styleId: int("style_id").references(() => styleCategories.id),
  styleOptionId: int("style_option_id").references(() => styleOptions.id),
  styleType: tinyint("style_type"),
  status: tinyint("status"),
});
