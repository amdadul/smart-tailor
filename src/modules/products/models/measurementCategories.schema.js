import { mysqlTable, serial, tinyint, varchar } from "drizzle-orm/mysql-core";

export const measurementCategories = mysqlTable("measurement_categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  type: tinyint("type").default(1), // 1->main, 2->loose
});
