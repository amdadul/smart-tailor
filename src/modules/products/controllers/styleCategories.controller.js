import { db } from "../../../../db.js";
import { styleCategories } from "../models/styleCategories.schema.js";

export const createStyleCategory = async (req, res) => {
  try {
    const createdBy = req?.user?.userId;
    const { name, type } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    const result = await db.insert(styleCategories).values({
      name,
      type,
      createdBy,
    });

    res.status(201).json({
      success: true,
      message: "Style Category created successfully.",
      result,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getStyleCategoryList = async (req, res) => {
  try {
    const categoryList = await db.select().from(styleCategories);

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
