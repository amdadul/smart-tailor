import { eq } from "drizzle-orm";
import { db } from "../../../../db.js";
import { measurementCategories } from "../models/measurementCategories.schema.js";

export const createMeasurementCategory = async (req, res) => {
  try {
    const createdBy = req?.user?.userId;
    const { name, type } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    const result = await db.insert(measurementCategories).values({
      name,
      type,
      createdBy,
    });

    res.status(201).json({
      success: true,
      message: "Measurement Category created successfully.",
      result,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getMeasurementCategoryList = async (req, res) => {
  try {
    const categoryList = await db.select().from(measurementCategories);

    if (categoryList.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "data not found." });
    }

    res.status(200).json({
      success: true,
      message: "category found!",
      data: categoryList,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getMeasurementCategoryByType = async (req, res) => {
  try {
    const { type } = req.body;
    const optionList = await db
      .select()
      .from(measurementCategories)
      .where(eq(measurementCategories.type, type));

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
