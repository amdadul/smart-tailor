import {
  decimal,
  int,
  mysqlTable,
  serial,
  varchar,
} from "drizzle-orm/mysql-core";

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  businessId: int("business_id"),
  name: varchar("name", { length: 100 }),
  price: decimal("price", { precision: 10, scale: 2 }),
  image: varchar("image", { length: 255 }),
});
