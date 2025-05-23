import { mysqlTable, serial, tinyint, varchar } from "drizzle-orm/mysql-core";
export const status = mysqlTable("status", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  type: tinyint("type"), // 1->order, 2->delivery, 3->payment
});
