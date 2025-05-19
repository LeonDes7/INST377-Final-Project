import { getSupabaseClient } from "../supabaseClient.js";

export default async function handler(req, res) {
  const supabase = getSupabaseClient();

  if (req.method === "POST") {
    const { username, anime_id, anime_title } = req.body;

    if (!username || !anime_id || !anime_title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { data, error } = await supabase
      .from("favorites")
      .insert([{ username, anime_id, anime_title }]);

    if (error) {
      console.error("Insert favorite error:", error);
      return res
        .status(500)
        .json({ error: "Failed to add favorite", details: error });
    }

    return res.status(201).json({ message: "Favorite added", data });
  }

  if (req.method === "GET") {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: "Username query required" });
    }

    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("username", username);

    if (error) {
      console.error("Fetch favorites error:", error);
      return res.status(500).json({ error: "Failed to fetch favorites" });
    }

    return res.status(200).json(data);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
