import {
  int,
  mysqlTable,
  serial,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";

export const orderImages = mysqlTable("order_images", {
  id: serial("id").primaryKey(),
  orderId: int("order_id"),
  productId: int("product_id"),
  image: varchar("image", { length: 255 }),
  status: tinyint("status"),
});
