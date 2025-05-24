import {
  boolean,
  date,
  decimal,
  int,
  mysqlTable,
  serial,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";
import { paymentMethods } from "../../config/models/paymentMethods.schema";
import { status } from "../../config/models/status.schema";
import { customers } from "../../customers/models/customers.schema";

export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  orderNo: varchar("order_no", { length: 100 }),
  type: tinyint("type"), // 1->Stitching, 2->Alteration
  customerId: int("customer_id").references(() => customers.id),
  customerName: varchar("customer_name", { length: 100 }),
  customerPhone: varchar("customer_phone", { length: 20 }),
  customerAddress: varchar("customer_address", { length: 255 }),
  febricAmount: decimal("febric_amount", { precision: 10, scale: 2 }),
  stitchingAmount: decimal("stitching_amount", { precision: 10, scale: 2 }),
  extraAmount: decimal("extra_amount", { precision: 10, scale: 2 }),
  discount: decimal("discount", { precision: 10, scale: 2 }),
  total: decimal("total", { precision: 10, scale: 2 }),
  paymentMethodId: int("payment_method_id").references(() => paymentMethods.id),
  paidAmount: decimal("paid_amount", { precision: 10, scale: 2 }),
  orderStatus: tinyint("order_status").references(() => status.id),
  orderDate: date("order_date"),
  trialDate: date("trial_date"),
  workerDeliveryDate: date("worker_delivery_date"),
  deliveryDate: date("delivery_date"),
  isMeasurementDressGiven: boolean("is_measurement_dress_given").default(false),
  numberOfMeasurementDress: int("number_of_measurement_dress"),
  status: tinyint("status").references(() => status.id),
});
