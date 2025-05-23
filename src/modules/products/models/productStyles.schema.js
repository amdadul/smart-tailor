import { int, mysqlTable, serial, tinyint } from "drizzle-orm/mysql-core";

export const productStyles = mysqlTable("product_styles", {
  id: serial("id").primaryKey(),
  productId: int("product_id"),
  styleId: int("style_id"),
  styleOptionId: int("style_option_id"),
  styleType: tinyint("style_type"), // 1->single, 2->multiple
});
