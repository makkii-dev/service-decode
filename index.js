const express = require('express')
const keypair = require('lib-keypair')
const contract = require('lib-contract')
const config = require('./config.json')
const app = express()

app.get('/raw/:q', (req, res)=>{
    res.end(JSON.stringify(keypair.unsign(
        'aion', 
        req.params.q    
    )))
})

app.get('/data/:q', (req, res)=>{
    let decoded = contract.decode(
        'aion', 
        req.params.q    
    )
    console.log(decoded)
    if(decoded && decoded.params){
        for(let i = 0, m = decoded.params.length; i < m; i ++){
            if(decoded.params[i].type === 'biginteger'){
                decoded.params[i].value = decoded.params[i].value.toString()
            }
            if(decoded.params[i].type === 'biginteger[]'){
                for(let ii = 0, mm = decoded.params[i].value.length; ii < mm; ii ++){
                    decoded.params[i].value[ii] = decoded.params[i].value[ii].toString()
                }
            }
        }
    }

    res.end(JSON.stringify(decoded))
 })

const server = app.listen(config.port, config.hostname, ()=>{
   host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})