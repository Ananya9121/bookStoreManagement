const app = require('./app');

let port = process.env.PORT || 4004;

app.listen(port, function(err) {
    if(err) {
        console.log('error in start server',err);
        return
    }
    console.log(`App running on Port : ${port}`);
})