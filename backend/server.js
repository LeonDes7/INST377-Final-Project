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


app.post('/api/favorites', async (req, res) => {
  console.log("Received body:", req.body); 

  const { username, anime_id, anime_title } = req.body;

  const { data, error } = await supabase
    .from('favorites')
    .insert([{ username, anime_id, anime_title }]);

  if (error) {
    console.error('Insert favorite error:', error); 
    return res.status(500).json({ error: 'Failed to add favorite', details: error });
  }

  console.log("Insert successful:", data); 
  res.status(201).json({ message: 'Favorite added', data }); 
});

// GET: Fetch favorites for a specific user
app.get('/api/favorites/:username', async (req, res) => {
  const { username } = req.params;

  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('username', username);

  if (error) {
    console.error('Fetch favorites error:', error);
    return res.status(500).json({ error: 'Failed to fetch favorites' });
  }

  res.status(200).json(data);
});

// DELETE: Remove a favorite
app.delete('/api/favorites', async (req, res) => {
  const { username, anime_id } = req.body;

  const { error } = await supabase
    .from('favorites')
    .delete()
    .match({ username, anime_id });

  if (error) {
    console.error('Delete favorite error:', error);
    return res.status(500).json({ error: 'Failed to remove favorite' });
  }

  res.status(200).json({ message: 'Favorite removed' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});