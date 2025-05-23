import { int, mysqlTable, serial, tinyint } from "drizzle-orm/mysql-core";

export const orderStyles = mysqlTable("order_styles", {
  id: serial("id").primaryKey(),
  orderId: int("order_id"),
  productId: int("product_id"),
  styleId: int("style_id"),
  styleOptionId: int("style_option_id"),
  styleType: tinyint("style_type"),
  status: tinyint("status"),
});
