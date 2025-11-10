const db = require('../../api/db');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).send('ok');
  }

  if (req.method === 'GET') {
    try {
      const { rows } = await db.query('SELECT * FROM recipes ORDER BY id ASC');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, image, history, tools, ingredients, steps, rating } = req.body;
      const { rows } = await db.query(
        `INSERT INTO recipes (name, description, image, history, tools, ingredients, steps, rating)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [name, description, image, history, tools, ingredients, steps, rating]
      );
      res.status(201).json(rows[0]);
    } catch (error) {
      console.error('Error creating recipe:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
