import { eq } from "drizzle-orm";
import { db } from "../../../../db.js";
import { stores } from "../models/stores.schema.js";

export const getStoreList = async (req, res) => {
  try {
    const businessId = req?.user?.businessId;
    const storeList = await db
      .select({
        id: stores.id,
        businessId: stores.businessId,
        name: stores.name,
        phone: stores.phone,
        address: stores.address,
        isAuto: stores.isAuto,
      })
      .from(stores)
      .where(eq(stores.businessId, businessId));

    if (storeList.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "data not found." });
    }

    res.status(200).json({
      success: true,
      message: "store found!",
      data: storeList,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const createStore = async (req, res) => {
  try {
    const businessId = req?.user?.businessId;

    const { name, phone, address } = req.body;

    if (!name || !phone || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    const existing = await db
      .select()
      .from(stores)
      .where(eq(stores.phone, phone));
    if (existing.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Phone already exists." });
    }

    const result = await db.insert(stores).values({
      businessId,
      name,
      phone,
      address,
      isAuto: 2,
    });

    res
      .status(201)
      .json({ success: true, message: "Store created successfully.", result });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
