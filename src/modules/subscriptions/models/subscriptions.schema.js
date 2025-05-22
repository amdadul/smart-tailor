import {
  boolean,
  datetime,
  double,
  int,
  mysqlTable,
  tinyint,
} from "drizzle-orm/mysql-core";
import { businesses } from "./businesses.schema.js";
import { plans } from "./plans.schema.js";

export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").primaryKey().autoincrement(),
  businessId: int("business_id")
    .notNull()
    .references(() => businesses.id),
  planId: int("plan_id")
    .notNull()
    .references(() => plans.id),
  planPrice: double("plan_price").notNull(),
  paymentMethod: tinyint("payment_method").notNull(),
  paymentStatus: tinyint("payment_status").notNull(),
  startDate: datetime("start_date").default(null),
  endDate: datetime("end_date").default(null),
  trialEndDate: datetime("trial_end_date").default(null),
  isActive: boolean("is_active").default(true),
});
