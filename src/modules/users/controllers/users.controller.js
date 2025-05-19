import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { db } from "../../../../db.js";
import { uploadFile } from "../../../helpers/uploadHelper.js";
import { users } from "../models/users.schema.js";

export const createUser = async (req, res) => {
  try {
    await uploadFile("uploads/users/profile_pictures", "profilePicture")(
      req,
      res
    );
    const { name, phone, email, password, type } = req.body;

    if (!name || !phone || !password || type === undefined) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    // Check if user already exists
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.phone, phone));
    if (existing.length > 0) {
      return res.status(409).json({ message: "Phone already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePicture = req.file
      ? `/uploads/users/profile_pictures/${req.file.filename}`
      : null;

    const result = await db.insert(users).values({
      name,
      phone,
      email,
      type,
      password: hashedPassword,
      profilePicture,
    });

    res.status(201).json({ message: "User created successfully.", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
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
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = existing[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, phone: user.phone },
      process.env.JWT_SECRET || "your_secret_key",
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
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
