const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Routers
app.use('/users', require('./routes/users'));
app.use('/credentials', require('./routes/credentials'));
app.use('/auctions', require('./routes/auctions'));



// Middleware
// app.use(require('./middleware/log-time'));
// app.use(require('./middleware/is-logged-in'));
// app.use(require('./middleware/is-admin'));





app.listen(port, ()=>{
    console.log(`User server is running on port ${port}!`);
});
