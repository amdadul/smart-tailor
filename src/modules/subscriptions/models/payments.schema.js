import { sql } from "drizzle-orm";
import {
  boolean,
  datetime,
  decimal,
  int,
  mysqlTable,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";
import { subscriptions } from "./subscriptions.schema.js";

export const payments = mysqlTable("payments", {
  id: int("id").primaryKey().autoincrement(),
  subscriptionId: int("subscription_id")
    .notNull()
    .references(() => subscriptions.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  method: tinyint("method", { length: 2 }).notNull().default(1), // '1 -> bkash'
  status: tinyint("status", { length: 2 }).notNull().default(0), // e.g. '0->pending', '1->completed'
  transactionId: varchar("transaction_id", { length: 100 }),
  createdAt: datetime("created_at").default(sql`NOW()`),
  isSuccess: boolean("is_success").default(false),
});
