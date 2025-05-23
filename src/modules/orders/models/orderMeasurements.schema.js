import {
  int,
  mysqlTable,
  serial,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";

export const orderMeasurements = mysqlTable("order_measurements", {
  id: serial("id").primaryKey(),
  orderId: int("order_id"),
  productId: int("product_id"),
  categoryId: int("category_id"),
  categoryType: tinyint("category_type"),
  value: varchar("value", { length: 50 }),
  status: tinyint("status"),
});
