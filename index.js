import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app=express();


const port = process.env.PORT|| 3000;

console.log(`PORT :${process.env.PORT}`);
app.use(express.json());

const teaData=[];
var nextId=1;
app.post("/tea",(req,res)=>{
    const {name ,price} = req.body;
    const tea={id: nextId++,name,price};
    teaData.push(tea);
    res.status(201).send(tea);
});

app.get("/teas",(req,res)=>{
    res.status(200).send(teaData);
});

app.get("/teas/:id",(req,res)=>{ 

    const id =parseInt(req.params.id);
    const tea = teaData.find((t)=>t.id===id);
    if(!tea){
        return res.status(404).send("tea not found");
    }
    res.status(200).send(tea);
 });

 app.put("/teas/:id",(req,res)=>{
    const id =parseInt(req.params.id);
    const tea = teaData.find((t)=>t.id===id);
    if(!tea){
        return res.status(404).send("tea not found");
    }
    const {name,price}=req.body;
    tea.name=name;
    tea.price=price;
    res.status(200).send(tea);
 });
 app.delete("/teas/:id",(req,res)=>{
    const id =parseInt(req.params.id);
    const teaIndex = teaData.findIndex((t)=>t.id===id);
    if(teaIndex===-1){
        return res.status(404).send("tea not found");
    }
    teaData.splice(teaIndex,1);
    res.status(204).send();
 });
app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}/`)});
