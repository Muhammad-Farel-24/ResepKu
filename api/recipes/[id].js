const db = require('../../api/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok');
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const { rows } = await db.query('SELECT * FROM recipes WHERE id = $1', [id]);
      if (rows.length === 0) {
        res.status(404).json({ error: 'Recipe not found' });
      } else {
        res.status(200).json(rows[0]);
      }
    } catch (error) {
      console.error(`Error fetching recipe with id ${id}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, description, image, history, tools, ingredients, steps, rating } = req.body;
      const { rows } = await db.query(
        `UPDATE recipes SET name = $1, description = $2, image = $3, history = $4, tools = $5, ingredients = $6, steps = $7, rating = $8
         WHERE id = $9 RETURNING *`,
        [name, description, image, history, tools, ingredients, steps, rating, id]
      );
      if (rows.length === 0) {
        res.status(404).json({ error: 'Recipe not found' });
      } else {
        res.status(200).json(rows[0]);
      }
    } catch (error) {
      console.error(`Error updating recipe with id ${id}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { rowCount } = await db.query('DELETE FROM recipes WHERE id = $1', [id]);
      if (rowCount === 0) {
        res.status(404).json({ error: 'Recipe not found' });
      } else {
        res.status(204).send(); // No Content
      }
    } catch (error) {
      console.error(`Error deleting recipe with id ${id}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
