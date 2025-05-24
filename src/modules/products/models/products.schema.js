import {
  decimal,
  int,
  mysqlTable,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";
import { businesses } from "../../subscriptions/models/businesses.schema.js";

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  businessId: int("business_id").references(() => businesses.id),
  name: varchar("name", { length: 100 }),
  price: decimal("price", { precision: 10, scale: 2 }),
  image: varchar("image", { length: 255 }),
});
