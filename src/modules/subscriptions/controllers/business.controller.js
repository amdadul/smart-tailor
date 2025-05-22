import { eq } from "drizzle-orm";
import { db } from "../../../../db.js";
import { businesses } from "../models/businesses.schema.js";

export const getBusinessList = async (req, res) => {
  try {
    const businessList = await db
      .select({
        id: businesses.id,
        name: businesses.name,
        phone: businesses.phone,
        address: businesses.address,
        logo: businesses.logo,
        ownerId: businesses.ownerId,
      })
      .from(businesses)
      .where(eq(businesses.status, 1));

    if (businessList.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "data not found." });
    }

    res.status(200).json({
      success: true,
      message: "business found!",
      data: businessList,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
