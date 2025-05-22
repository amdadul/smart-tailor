import { and, eq, gte, lte } from "drizzle-orm";
import { db } from "../../db.js";
import { plans } from "../modules/subscriptions/models/plans.schema.js";
import { stores } from "../modules/subscriptions/models/stores.schema.js";
import { subscriptions } from "../modules/subscriptions/models/subscriptions.schema.js";
import { users } from "../modules/users/models/users.schema.js";

export const checkSubscriptionLimit = (type) => {
  return async (req, res, next) => {
    const businessId = req?.user?.businessId;
    const currentDate = new Date();

    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.businessId, businessId),
          eq(subscriptions.isActive, true),
          lte(subscriptions.startDate, currentDate),
          gte(subscriptions.endDate, currentDate)
        )
      )
      .limit(1);

    if (!subscription) {
      return res.status(403).json({
        success: false,
        message: "No active subscription found or subscription expired.",
      });
    }

    const [plan] = await db
      .select()
      .from(plans)
      .where(eq(plans.id, subscription.planId))
      .limit(1);
    if (!plan) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid subscription plan." });
    }

    // Check store limit
    if (type === "store") {
      const storeCount = await db
        .select()
        .from(stores)
        .where(eq(stores.businessId, businessId));
      console.log(plan.storeLimit);
      if (storeCount.length >= plan.storeLimit) {
        return res.status(403).json({
          success: false,
          message: "Store limit reached for current plan.",
        });
      }
    }

    // Check user limit
    if (type === "user") {
      const userCount = await db
        .select()
        .from(users)
        .where(eq(users.businessId, businessId));

      if (userCount.length >= plan.userLimit) {
        return res.status(403).json({
          success: false,
          message: "User limit reached for current plan.",
        });
      }
    }

    // You can also add monthly order checks here.

    next();
  };
};
