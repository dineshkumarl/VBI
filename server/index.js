// require('dotenv').config();

const app = require('./app/index');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', (error)=>console.error(error));
db.once('open', ()=> console.log('Connected to Database'));

process.on('uncaughtException', (err)=>{
    // Handle the error safely
    console.log('Unhandled Rejection logging the error....');
    console.log(err.name. err.message);
});

process.on("SIGTERM", ()=>{
    console.log('SIGTERM received. Shutting down gracefully');
    // process.exit();
})

app.listen(PORT, ()=>{
    console.log('server started :: listening to the port :', PORT);
})
