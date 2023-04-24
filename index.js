const express=require("express");
const app=express();
const conn=require("./connect");
app.set("view engine","ejs");
const bodyParser = require('body-parser');
const tasks=require("./schema");
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

conn();
//route
// app.get ("/" , function(req,res){
//     res.render("index");
// })


app.listen(8080,function(){
    console.log("server is running on port 8080");
});

app.post("/api/v1/tasks", async (req, res) => {
    // create data in database
    try{
        const data = await tasks.create(req.body);
        res.status(201).json({
            status: "Success",
            data
        })
    }catch(e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }

});

app.get("/api/v1/tasks", async (req, res) => {
    // Write the ,code to fetch the data
    try{
        // const task = req.query;
        console.log(req.query);

        const data = await tasks.find();
        
        res.status(200).json({
            status: "Success",
            data
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});

app.get("/api/v1/tasks/:id", async (req, res) => {
    // Write the ,code to fetch the data
    try{
        const data = await tasks.findById({_id : req.params.id});
        res.status(200).json({
            status: "Success",
            data
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});


app.put("/api/v1/tasks/:id", async (req, res) => {
    // Write the ,code to fetch the data
    try{
        await tasks.updateOne({_id : req.params.id}, req.body);
        const data=  await tasks.findOne({_id : req.params.id});
        res.status(200).json({
            status: "Success",
            data
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});

// delete data : Delete Method 
app.delete("/api/v1/tasks/:id", async (req, res) => {
    // Write the ,code to fetch the data
    try{
        const data = await tasks.deleteOne({_id : req.params.id});
        res.status(200).json({
            status: "Success",
            data
        })
    }catch(e){
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
});

app.delete("/api/v1/tasks/delete" , async(req,res)=>{
    try{
        const data=await tasks.deleteAll({_id : req.params.id});
        res.status(204).json({
            status:"None",
            data
        })
    }catch(e){
        res.status(500).json({
            status:"Failed",
            message: e.message
        })
    }
})


app.get("*", (req, res) => {
    res.status(404).send("API IS NOT FOUND");
})

app.put("*", (req, res) => {
    res.status(404).send("API IS NOT FOUND");
})
app.post("*", (req, res) => {
    res.status(404).send("API IS NOT FOUND");
})
app.delete("*", (req, res) => {
    res.status(404).send("API IS NOT FOUND");
})