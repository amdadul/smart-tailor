import {
  int,
  mysqlTable,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";
import { users } from "../../users/models/users.schema.js";

export const businesses = mysqlTable("businesses", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 20 }).unique().notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  logo: varchar("logo", { length: 255 }),
  ownerId: int("owner_id").references(() => users.id),
  status: tinyint("status", { length: 2 }).notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
});
