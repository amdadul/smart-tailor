import { int, mysqlTable, timestamp, tinyint } from "drizzle-orm/mysql-core";
import { users } from "../../users/models/users.schema.js";
import { products } from "./products.schema.js";
import { styleCategories } from "./styleCategories.schema.js";
import { styleOptions } from "./styleOptions.schema.js";

export const productStyles = mysqlTable("product_styles", {
  id: int("id").primaryKey().autoincrement(),
  productId: int("product_id").references(() => products.id),
  styleId: int("style_id").references(() => styleCategories.id),
  styleOptionId: int("style_option_id").references(() => styleOptions.id),
  styleType: tinyint("style_type"), // 1->single, 2->multiple
  createdBy: int("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedBy: int("updated_by").references(() => users.id),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
