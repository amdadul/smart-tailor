import {
  int,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { businesses } from "../../subscriptions/models/businesses.schema.js";
import { users } from "../../users/models/users.schema.js";

export const customers = mysqlTable("customers", {
  id: serial("id").primaryKey(),
  businessId: int("business_id").references(() => businesses.id),
  name: varchar("name", { length: 100 }),
  phone: varchar("phone", { length: 20 }),
  address: varchar("address", { length: 255 }),
  createdBy: int("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedBy: int("updated_by").references(() => users.id),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
