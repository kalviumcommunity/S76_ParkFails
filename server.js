const express = require('express');

const app = express()

const PORT = process.env.PORT || 3000;
app.get('/',function(req,res){
    res.send('Welcome')
})

app.get('/ping',function(req,res){
    res.send('pong')
});

app.listen(PORT, function(req,res){
    console.log(`Server running on http://localhost:${PORT}`);
});

