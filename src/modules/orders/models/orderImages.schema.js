import {
  int,
  mysqlTable,
  serial,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";
import { products } from "../../products/models/products.schema.js";
import { orders } from "./orders.schema.js";

export const orderImages = mysqlTable("order_images", {
  id: serial("id").primaryKey(),
  orderId: int("order_id").references(() => orders.id),
  productId: int("product_id").references(() => products.id),
  image: varchar("image", { length: 255 }),
  status: tinyint("status"),
});
