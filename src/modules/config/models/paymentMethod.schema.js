import { boolean, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const paymentMethods = mysqlTable("payment_methods", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  status: boolean("status").default(true),
});
