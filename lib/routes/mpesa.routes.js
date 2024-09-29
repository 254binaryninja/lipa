import express from 'express';

const app = express();

app.use(express.json());

app.post('/api/v1/lipa-callback',(req,res)=>{
    const {body} = req;
      
    res.status(200)
})

app.listen(3001,()=>{console.log('Server is running on port 3001')})