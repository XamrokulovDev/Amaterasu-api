const app = require('./app');
require('dotenv').config();
const connectDb = require('./config/mongoose');

const PORT = process.env.PORT;

// connect to Database
connectDb();

// Run server
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});