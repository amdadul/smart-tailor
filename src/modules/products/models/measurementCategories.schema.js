import {
  int,
  mysqlTable,
  serial,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";
import { users } from "../../users/models/users.schema.js";

export const measurementCategories = mysqlTable("measurement_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  type: tinyint("type").default(1), // 1->main, 2->loose
  createdBy: int("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedBy: int("updated_by").references(() => users.id),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
