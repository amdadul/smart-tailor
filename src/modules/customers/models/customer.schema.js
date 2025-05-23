import {
  datetime,
  int,
  mysqlTable,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";

export const customers = mysqlTable("customers", {
  id: serial("id").primaryKey(),
  businessId: int("business_id"),
  name: varchar("name", { length: 100 }),
  phone: varchar("phone", { length: 20 }),
  address: varchar("address", { length: 255 }),
  createdAt: datetime("created_at").defaultNow(),
});
