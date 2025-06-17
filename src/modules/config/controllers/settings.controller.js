import { eq } from "drizzle-orm";
import { db } from "../../../../db.js";
import { settings } from "../models/settings.schema.js";

export const createSettings = async (req, res) => {
  try {
    const createdBy = req?.user?.userId;
    const businessId = req?.user?.businessId;
    const {
      deliveryDuration,
      trialDuration,
      workerDeliveryDuration,
      isSendSMSAfterCreate,
      createSMS,
      isSendSMSAfterReady,
      readySMS,
    } = req.body;

    if (!deliveryDuration) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    const result = await db.insert(settings).values({
      businessId,
      deliveryDuration,
      trialDuration,
      workerDeliveryDuration,
      isSendSMSAfterCreate,
      createSMS,
      isSendSMSAfterReady,
      readySMS,
    });

    res.status(201).json({
      success: true,
      message: "Settings created successfully.",
      result,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const businessId = req?.user?.businessId;
    const {
      deliveryDuration,
      trialDuration,
      workerDeliveryDuration,
      isSendSMSAfterCreate,
      createSMS,
      isSendSMSAfterReady,
      readySMS,
    } = req.body;

    if (!deliveryDuration) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    const result = await db
      .update(settings)
      .set({
        deliveryDuration,
        trialDuration,
        workerDeliveryDuration,
        isSendSMSAfterCreate,
        createSMS,
        isSendSMSAfterReady,
        readySMS,
      })
      .where(eq(settings.businessId, businessId));

    res.status(200).json({
      success: true,
      message: "Settings updated successfully.",
      result,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getSettings = async (req, res) => {
  try {
    const businessId = req?.user?.businessId;
    const data = await db
      .select()
      .from(settings)
      .where(eq(settings.businessId, businessId));

    if (data.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "data not found." });
    }

    res.status(200).json({
      success: true,
      message: "settings found!",
      data: data,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
