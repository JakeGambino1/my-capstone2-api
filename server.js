const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('API running');
});

app.use('/api/users', require('./api/users'));
app.use('/api/posts', require('./api/posts'));
