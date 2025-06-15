import { eq } from "drizzle-orm";
import { db } from "../../../../db.js";
import { styleOptions } from "../models/styleOptions.schema.js";

export const createStyleOptions = async (req, res) => {
  try {
    const createdBy = req?.user?.userId;
    const { categoryId, name } = req.body;

    if (!categoryId || !name) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    const result = await db.insert(styleOptions).values({
      categoryId,
      name,
      createdBy,
    });

    res.status(201).json({
      success: true,
      message: "Style options created successfully.",
      result,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getStyleOptions = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const optionList = await db
      .select()
      .from(styleOptions)
      .where(eq(styleOptions.categoryId, categoryId));

    if (optionList.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "data not found." });
    }

    res.status(200).json({
      success: true,
      message: "option found!",
      data: optionList,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
