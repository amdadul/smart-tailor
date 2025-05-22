import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { db } from "../../../../db.js";
import { uploadFile } from "../../../helpers/uploadHelper.js";
import { businesses } from "../../subscriptions/models/businesses.schema.js";
import { plans } from "../../subscriptions/models/plans.schema.js";
import { stores } from "../../subscriptions/models/stores.schema.js";
import { subscriptions } from "../../subscriptions/models/subscriptions.schema.js";
import { users } from "../models/users.schema.js";

export const createUser = async (req, res) => {
  try {
    await uploadFile("uploads/users/profile_pictures", "profilePicture")(
      req,
      res
    );
    const { name, phone, email, password, type, storeId } = req.body;

    if (!name || !phone || !password || !storeId || type === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    // Check if user already exists
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.phone, phone));
    if (existing.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Phone already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePicture = req.file
      ? `/uploads/users/profile_pictures/${req.file.filename}`
      : null;

    const businessId = req?.user?.businessId;

    const result = await db.insert(users).values({
      name,
      phone,
      email,
      type,
      storeId,
      businessId,
      password: hashedPassword,
      profilePicture,
    });

    res
      .status(201)
      .json({ success: true, message: "User created successfully.", result });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.phone, phone));

    if (existing.length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    const user = existing[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        phone: user.phone,
        type: user.type,
        storeId: user.storeId,
        businessId: user.businessId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        type: user.type,
        storeId: user.storeId,
        businessId: user.businessId,
      },
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const businessSignUp = async (req, res) => {
  try {
    const { name, businessName, phone, email, address, password } = req.body;

    if (!name || !phone || !password || !businessName || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields are missing." });
    }

    // Check if user already exists
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.phone, phone));
    if (existing.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Phone already exists." });
    }

    const existingBusiness = await db
      .select()
      .from(businesses)
      .where(eq(businesses.phone, phone));
    if (existingBusiness.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Phone already exists." });
    }

    const [basicPlan] = await db.select().from(plans).where(eq(plans.id, 1));

    if (!basicPlan) {
      return res
        .status(409)
        .json({ success: false, message: "Plan not available right now." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const now = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + basicPlan.trialDays);

    await db.transaction(async (tx) => {
      const [business] = await tx.insert(businesses).values({
        name: businessName,
        phone,
        address,
      });
      const businessId = business.insertId;

      // 1. Create user
      const [store] = await tx.insert(stores).values({
        businessId,
        name: businessName,
        phone,
        address,
      });
      const storeId = store.insertId;
      const [subscription] = await tx.insert(subscriptions).values({
        businessId,
        planId: basicPlan.id,
        planPrice: basicPlan.price,
        paymentMethod: 1,
        paymentStatus: 1,
        startDate: now,
        endDate,
        trialEndDate: endDate,
      });
      // 2. Create subscription

      const [user] = await tx.insert(users).values({
        name,
        phone,
        email,
        type: 1,
        storeId,
        businessId,
        password: hashedPassword,
      });
      const ownerId = user.insertId;

      const updated = await tx
        .update(businesses)
        .set({
          ownerId,
        })
        .where(eq(businesses.id, businessId));
    });

    res
      .status(201)
      .json({ success: true, message: "Business Signup successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const getUserList = async (req, res) => {
  try {
    const businessId = req?.user?.businessId;
    const userList = await db
      .select({
        id: users.id,
        businessId: users.businessId,
        storeId: users.storeId,
        name: users.name,
        phone: users.phone,
        email: users.email,
        type: users.type,
        profilePicture: users.profilePicture,
      })
      .from(users)
      .where(eq(users.businessId, businessId));

    if (userList.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "data not found." });
    }

    res.status(200).json({
      success: true,
      message: "user found!",
      data: userList,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
