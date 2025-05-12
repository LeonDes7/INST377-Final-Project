import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import cors from 'cors';
import { getSupabaseClient } from './supabaseClient.js'; 

const supabase = getSupabaseClient(); 

console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// GET: Fetch all recommendations for a user
app.get('/api/recommendations/:username', async (req, res) => {
    const { username } = req.params;

    const { data, error } = await supabase
        .from('recommendations')
        .select('*')
        .eq('username', username);

    if (error) {
        console.error('Fetch error:', error);
        return res.status(500).json({ error: 'Failed to retrieve recommendations' });
    }

    res.json(data);
});

app.post('/api/recommendations', async (req, res) => {
  const { username, anime_title, score } = req.body;
  console.log("Received from client:", { username, anime_title, score });

  const { data, error } = await supabase
    .from('recommendations')
    .insert([{ username, anime_title, score }]);

  console.log("Insert result:", data);
  console.log("Insert error:", error);

  if (error) {
    return res.status(500).json({ error: 'Failed to save recommendation', details: error });
  }

  res.status(201).json({ success: true, data });
});