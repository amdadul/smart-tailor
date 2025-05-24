import {
  int,
  mysqlTable,
  serial,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";
import { measurementCategories } from "../../products/models/measurementCategories.schema.js";
import { products } from "../../products/models/products.schema.js";
import { orders } from "./orders.schema.js";

export const orderMeasurements = mysqlTable("order_measurements", {
  id: serial("id").primaryKey(),
  orderId: int("order_id").references(() => orders.id),
  productId: int("product_id").references(() => products.id),
  categoryId: int("category_id").references(() => measurementCategories.id),
  categoryType: tinyint("category_type"),
  value: varchar("value", { length: 50 }),
  status: tinyint("status"),
});
