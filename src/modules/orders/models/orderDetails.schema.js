import {
  decimal,
  int,
  mysqlTable,
  text,
  tinyint,
} from "drizzle-orm/mysql-core";
import { products } from "../../products/models/products.schema.js";
import { orders } from "./orders.schema.js";

export const orderDetails = mysqlTable("order_details", {
  id: int("id").primaryKey().autoincrement(),
  orderId: int("order_id").references(() => orders.id),
  productId: int("product_id").references(() => products.id),
  specialNote: text("special_note"),
  quantity: int("quantity"),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }),
  subTotal: decimal("sub_total", { precision: 10, scale: 2 }),
  status: tinyint("status"),
});
