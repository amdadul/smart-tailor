import {
  int,
  mysqlTable,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";
import { users } from "../../users/models/users.schema.js";

export const styleCategories = mysqlTable("style_categories", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }),
  type: tinyint("type").default(1), // 1->single, 2->multiple (checkbox)
  createdBy: int("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedBy: int("updated_by").references(() => users.id),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
