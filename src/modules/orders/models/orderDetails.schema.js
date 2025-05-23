import {
  decimal,
  int,
  mysqlTable,
  serial,
  text,
  tinyint,
} from "drizzle-orm/mysql-core";
import { orders } from "./orders.schema.js";

export const orderDetails = mysqlTable("order_details", {
  id: serial("id").primaryKey(),
  orderId: int("order_id").references(() => orders.id),
  productId: int("product_id"),
  specialNote: text("special_note"),
  quantity: int("quantity"),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }),
  subTotal: decimal("sub_total", { precision: 10, scale: 2 }),
  status: tinyint("status"),
});
