import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { users } from "../../users/models/users.schema.js";
import { styleCategories } from "./styleCategories.schema.js";

export const styleOptions = mysqlTable("style_options", {
  id: int("id").primaryKey().autoincrement(),
  categoryId: int("category_id").references(() => styleCategories.id),
  name: varchar("name", { length: 100 }),
  createdBy: int("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedBy: int("updated_by").references(() => users.id),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
