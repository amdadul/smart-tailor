import { and, desc, eq, gte, lte } from "drizzle-orm";
import { db } from "../../../../db.js";
import { payments } from "../models/payments.schema.js";
import { plans } from "../models/plans.schema.js";
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

export const purchaseSubscription = async (req, res) => {
  try {
    const businessId = req?.user?.businessId;
    const { planId, method, transactionId } = req.body;

    const [plan] = await db.select().from(plans).where(eq(plans.id, planId));
    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }

    const now = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.intervalDays);

    await db.transaction(async (tx) => {
      // 1. Create Subscription
      const [subscription] = await tx.insert(subscriptions).values({
        businessId,
        planId: plan.id,
        planPrice: plan.price,
        startDate: now,
        endDate,
        paymentMethod: method,
        paymentStatus: 1,
        isActive: true,
      });

      // 2. Create Payment Record
      await tx.insert(payments).values({
        subscriptionId: subscription.insertId,
        amount: plan.price,
        method,
        status: 1,
        transactionId,
        isSuccess: true,
      });

      // Optional: update business or store info
    });

    return res
      .status(200)
      .json({ success: true, message: "Subscription purchased successfully." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
