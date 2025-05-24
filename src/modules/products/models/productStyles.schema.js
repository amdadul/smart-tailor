import { int, mysqlTable, serial, tinyint } from "drizzle-orm/mysql-core";
import { products } from "./products.schema.js";
import { styleCategories } from "./styleCategories.schema.js";
import { styleOptions } from "./styleOptions.schema.js";

export const productStyles = mysqlTable("product_styles", {
  id: serial("id").primaryKey(),
  productId: int("product_id").references(() => products.id),
  styleId: int("style_id").references(() => styleCategories.id),
  styleOptionId: int("style_option_id").references(() => styleOptions.id),
  styleType: tinyint("style_type"), // 1->single, 2->multiple
});
