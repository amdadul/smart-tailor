import { db } from "../../../../db.js";
import { paymentMethods } from "../models/paymentMethods.schema.js";

export const createPaymentMethods = async (req, res) => {
  try {
    const createdBy = req?.user?.userId;
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    const result = await db.insert(paymentMethods).values({
      name,
    });

    res.status(201).json({
      success: true,
      message: "Payment Method created successfully.",
      result,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getPaymentMethodList = async (req, res) => {
  try {
    const methodList = await db.select().from(paymentMethods);

    if (methodList.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "data not found." });
    }

    res.status(200).json({
      success: true,
      message: "method found!",
      data: methodList,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
