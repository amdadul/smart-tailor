import {
  int,
  mysqlTable,
  text,
  timestamp,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull().unique(),
  email: varchar("email", { length: 250 }).unique(),
  type: tinyint("type").notNull(),
  password: text("password").notNull(),
  profilePicture: text("profile_picture"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});
