import { and, desc, eq, gte, lte } from "drizzle-orm";
import { db } from "../../../../db.js";
import { subscriptions } from "../models/subscriptions.schema.js";

export const getActiveSubscription = async (req, res) => {
  try {
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

    res.status(200).json({
      success: true,
      message: "subscription found!",
      data: subscription,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getLastActiveSubscription = async (req, res) => {
  try {
    const businessId = req?.user?.businessId;

    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.businessId, businessId),
          eq(subscriptions.isActive, true)
        )
      )
      .orderBy(desc(subscriptions.endDate))
      .limit(1);

    if (!subscription) {
      return res.status(403).json({
        success: false,
        message: "No active subscription found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "subscription found!",
      data: subscription,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
