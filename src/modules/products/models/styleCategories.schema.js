import {
  mysqlTable,
  serial,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";

export const styleCategories = mysqlTable("style_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  type: tinyint("type").default(1), // 1->single, 2->multiple (checkbox)
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
