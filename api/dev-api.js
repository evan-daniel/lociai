
// INIT

const express = require('express'); 

const dotenv = require('dotenv'); 
dotenv.config(); 

const cors = require('cors'); 

// OPEN AI INIT

const OpenAIApi = require('openai'); 
const Configuration = OpenAIApi.Configuration; 
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi.OpenAIApi(configuration);



// SERVER

const app = express(); 

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({ 
  origin: '*', 
})); 
console.log('RUNNING SERVER'); 

app.post('/api/gen', async (req, res) => {

    // console.log('POST', req.body.desc); 

    // PRODUCTION
    
    const img = await openai.createImage({
      prompt: req.body.desc,
      n: 1,
      size: "256x256",
      response_format: 'b64_json', 
    });
    // res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.status(200).json(img.data.data[0].b64_json); 

    // TESTING
    
    // res.status(200).json({ 
    //   result: 'https://cdn.wikimg.net/en/strategywiki/images/6/6c/Zelda_ALttP_Quarreling_brothers.png', 
    //   query: req.body.desc, 
    // }); 

    // res.status(200).json({ result: 'PHLEGMER' }); 
    
}); 

// app.get('/api/gen', async (req, res) => {
//   console.log('GET')
//   console.log('FROM THE SERVER'); 
//   res.status(200).json({ result: 'https://cdn.wikimg.net/en/strategywiki/images/6/6c/Zelda_ALttP_Quarreling_brothers.png' }); 

// })

module.exports = app; 

app.listen(3000); 