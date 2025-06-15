import { int, mysqlTable, timestamp, tinyint } from "drizzle-orm/mysql-core";
import { users } from "../../users/models/users.schema.js";
import { measurementCategories } from "./measurementCategories.schema.js";
import { products } from "./products.schema.js";

export const productMeasurements = mysqlTable("product_measurements", {
  id: int("id").primaryKey().autoincrement(),
  productId: int("product_id").references(() => products.id),
  categoryId: int("category_id").references(() => measurementCategories.id),
  categoryType: tinyint("category_type"), // 1 -> main, 2 -> loose
  createdBy: int("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedBy: int("updated_by").references(() => users.id),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
