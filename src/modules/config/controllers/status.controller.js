import { eq } from "drizzle-orm";
import { db } from "../../../../db.js";
import { status } from "../models/status.schema.js";

export const createStatus = async (req, res) => {
  try {
    const createdBy = req?.user?.userId;
    const { name, type } = req.body;

    if (!name || !type) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    const result = await db.insert(status).values({
      name,
      type,
    });

    res.status(201).json({
      success: true,
      message: "Status created successfully.",
      result,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getStatusList = async (req, res) => {
  try {
    const statusList = await db.select().from(status);

    if (statusList.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "data not found." });
    }

    res.status(200).json({
      success: true,
      message: "method found!",
      data: statusList,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getStatusListByType = async (req, res) => {
  try {
    const { type } = req.body;
    const statusList = await db
      .select()
      .from(status)
      .where(eq(status.type, type));

    if (statusList.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "data not found." });
    }

    res.status(200).json({
      success: true,
      message: "status found!",
      data: statusList,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
