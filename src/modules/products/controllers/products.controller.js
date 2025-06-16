import { eq } from "drizzle-orm";
import { db } from "../../../../db.js";
import { uploadFile } from "../../../helpers/uploadHelper.js";
import { measurementCategories } from "../models/measurementCategories.schema.js";
import { productMeasurements } from "../models/productMeasurements.schema.js";
import { products } from "../models/products.schema.js";
import { productStyles } from "../models/productStyles.schema.js";
import { styleCategories } from "../models/styleCategories.schema.js";
import { styleOptions } from "../models/styleOptions.schema.js";

export const createProduct = async (req, res) => {
  try {
    await uploadFile("uploads/products/images", "image")(req, res);
    const createdBy = req?.user?.userId;
    const businessId = req?.user?.businessId;
    const { name, price, styles, measurements } = req.body;

    if (!price || !name) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    if (
      !Array.isArray(measurements) ||
      measurements.some((m) => !m.categoryId || !m.categoryType)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid measurements format." });
    }

    if (
      !Array.isArray(styles) ||
      styles.some((s) => !s.styleId || !s.styleOptionId || !s.styleType)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid style format." });
    }

    const image = req.file
      ? `/uploads/products/images/${req.file.filename}`
      : null;

    await db.transaction(async (tx) => {
      const [product] = await tx.insert(products).values({
        businessId,
        name,
        price,
        image,
        createdBy,
      });

      const productId = product.insertId;

      const measurementInserts = measurements.map((m) => ({
        productId: productId,
        categoryId: m.categoryId,
        categoryType: m.categoryType,
        createdBy,
      }));

      await tx.insert(productMeasurements).values(measurementInserts);

      const styleInserts = styles.map((s) => ({
        productId: productId,
        styleId: s.styleId,
        styleOptionId: s.styleOptionId,
        styleType: s.styleType,
        createdBy,
      }));

      await tx.insert(productStyles).values(styleInserts);
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const businessId = req?.user?.businessId;
    const productList = await db
      .select()
      .from(products)
      .where(eq(products.businessId, businessId));

    if (productList.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "data not found." });
    }

    res.status(200).json({
      success: true,
      message: "product found!",
      data: productList,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const businessId = req?.user?.businessId;
    const productId = parseInt(req.params.id);

    // Fetch product
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))
      .where(eq(products.businessId, businessId));

    if (product.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    // Fetch related styles
    const productStyleList = await db
      .select({
        id: productStyles.id,
        styleType: productStyles.styleType,
        styleId: productStyles.styleId,
        styleOptionId: productStyles.styleOptionId,
        styleName: styleCategories.name,
        styleOptionName: styleOptions.name,
      })
      .from(productStyles)
      .leftJoin(styleCategories, eq(productStyles.styleId, styleCategories.id))
      .leftJoin(styleOptions, eq(productStyles.styleOptionId, styleOptions.id))
      .where(eq(productStyles.productId, productId));

    // Fetch measurements with category name
    const measurements = await db
      .select({
        id: productMeasurements.id,
        categoryType: productMeasurements.categoryType,
        categoryId: productMeasurements.categoryId,
        categoryName: measurementCategories.name,
      })
      .from(productMeasurements)
      .leftJoin(
        measurementCategories,
        eq(productMeasurements.categoryId, measurementCategories.id)
      )
      .where(eq(productMeasurements.productId, productId));

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: {
        ...product[0],
        styles: productStyleList,
        measurements,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};
