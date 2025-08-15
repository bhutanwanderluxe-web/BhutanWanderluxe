const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

app.set('view engine', 'ejs');
app.set('views', './views');

mongoose
    .connect(process.env.DATABASE)
    .then(() => console.log("DB connection successfully!"));

const port = process.env.PORT || 5000;
console.log(port);
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!  Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
