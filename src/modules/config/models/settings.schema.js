import { boolean, int, mysqlTable, serial, text } from "drizzle-orm/mysql-core";

export const settings = mysqlTable("settings", {
  id: serial("id").primaryKey(),
  businessId: int("business_id"),
  deliveryDuration: int("delivery_duration"),
  trialDuration: int("trial_duration"),
  workerDeliveryDuration: int("worker_delivery_duration"),
  isSendSMSAfterCreate: boolean("is_send_sms_after_create").default(false),
  createSMS: text("create_sms"),
  isSendSMSAfterReady: boolean("is_send_sms_after_ready").default(false),
  readySMS: text("ready_sms"),
});
