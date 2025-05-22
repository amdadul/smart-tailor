import { eq } from "drizzle-orm";
import { db } from "../../../../db.js";
import { plans } from "../models/plans.schema.js";

export const createPlan = async (req, res) => {
  try {
    const {
      name,
      description,
      storeLimit,
      userLimit,
      monthlyOrderLimit,
      price,
      trialDays,
      intervalDays,
    } = req.body;

    if (
      !name ||
      !description ||
      !storeLimit ||
      !userLimit ||
      !monthlyOrderLimit ||
      !price ||
      !trialDays ||
      !intervalDays
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    const result = await db.insert(plans).values({
      name,
      description,
      storeLimit,
      userLimit,
      monthlyOrderLimit,
      price,
      trialDays,
      intervalDays,
    });

    res
      .status(201)
      .json({ success: true, message: "Plan created successfully.", result });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getPlanList = async (req, res) => {
  try {
    const userList = await db.select().from(plans).where(eq(plans.status, 1));

    if (userList.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "data not found." });
    }

    res.status(200).json({
      success: true,
      message: "plan found!",
      data: userList,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
