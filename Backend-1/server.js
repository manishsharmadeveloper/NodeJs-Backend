const app = require('./src/app');

app.get("/",(req,res)=>{
    res.send("server live");
})

const port  = 3000;

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
})