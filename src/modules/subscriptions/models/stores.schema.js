import {
  int,
  mysqlTable,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";
import { users } from "../../users/models/users.schema.js";
import { businesses } from "./businesses.schema.js";

export const stores = mysqlTable("stores", {
  id: int("id").primaryKey().autoincrement(),
  businessId: int("business_id")
    .notNull()
    .references(() => businesses.id),
  name: varchar("name", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 20 }).unique().notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  isAuto: tinyint("is_auto", { length: 2 }).notNull().default(1),
  status: tinyint("status", { length: 2 }).notNull().default(1),
  createdBy: int("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedBy: int("updated_by").references(() => users.id),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
