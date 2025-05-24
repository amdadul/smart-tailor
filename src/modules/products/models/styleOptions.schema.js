import {
  int,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { styleCategories } from "./styleCategories.schema.js";

export const styleOptions = mysqlTable("style_options", {
  id: serial("id").primaryKey(),
  categoryId: int("category_id").references(() => styleCategories.id),
  name: varchar("name", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
