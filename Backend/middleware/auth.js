import { clerkClient } from "@clerk/express";
import { getAuth } from "@clerk/express";

export const protectAdmin = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized - No userId" });
    }

    const user = await clerkClient.users.getUser(userId);

    const role = user.privateMetadata?.role;

    if (role !== 'admin') {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Authorization failed" });
  }
};
