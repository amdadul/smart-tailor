import {
  int,
  mysqlTable,
  text,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";

export const plans = mysqlTable("plans", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  storeLimit: int("store_limit").notNull(),
  userLimit: int("user_limit").notNull(),
  monthlyOrderLimit: int("monthly_order_limit").notNull(),
  price: int("price").notNull(),
  trialDays: int("trial_days").notNull(),
  intervalDays: int("interval_days").notNull(),
  status: tinyint("status", { length: 2 }).notNull().default(1),
});
