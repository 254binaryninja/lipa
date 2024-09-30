import express from 'express';

const app = express();

app.use(express.json());

const whitelist = [
  '196.201.214.200',
 '196.201.214.206',
 '196.201.213.114',
 '196.201.214.207',
 '196.201.214.208',
 '196.201.213.44',
 '196.201.212.127',
 '196.201.212.138',
 '196.201.212.129',
 '196.201.212.136',
 '196.201.212.74',
 '196.201.212.69'
];

app.post('/api/v1/lipa-callback',(req,res)=>{
  const clientIp = req.ip;
  if (!whitelist.includes(clientIp)){
    return res.status(403).json({error:'IP not whitelisted'})
  }
      
    res.status(200)
})

app.post('/api/v1/c2b-callback',(req,res)=>{
  const clientIp = req.ip;
  if (!whitelist.includes(clientIp)){
    return res.status(403).json({error:'IP not whitelisted'})
  }
 
    res.status(200)
})


app.post('/api/v1/b2b-callback',(req,res)=>{
  const clientIp = req.ip;
  if (!whitelist.includes(clientIp)){
    return res.status(403).json({error:'IP not whitelisted'})
  }

    res.status(200)
})

app.listen(3001,()=>{console.log('Server is running on port 3001')})