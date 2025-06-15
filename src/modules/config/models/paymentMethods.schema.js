import { boolean, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const paymentMethods = mysqlTable("payment_methods", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }),
  status: boolean("status").default(true),
});
