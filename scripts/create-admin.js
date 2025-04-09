import connectToDatabase from "../lib/mongodb.js";
import Admin from "../lib/models/Admin.js";

async function createAdmin() {
  try {
    await connectToDatabase();

    const adminData = {
      username: "admin",
      password: "admin123", // This will be hashed automatically by the Admin model
    };

    const admin = new Admin(adminData);
    await admin.save();

    console.log("Admin account created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin account:", error);
    process.exit(1);
  }
}

createAdmin();
