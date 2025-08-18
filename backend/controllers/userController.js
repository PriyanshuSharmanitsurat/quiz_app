
import {pool} from "../config/db.js";

export const getUserNotification = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "SELECT notification FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const { notification } = result.rows[0];
    res.status(200).json({ notification });
  } catch (error) {
    console.error("Error fetching notification:", error);
    res.status(500).json({ error: "Failed to fetch notification" });
  }
};
