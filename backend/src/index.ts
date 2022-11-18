import {config} from 'dotenv'
config()
import express from 'express'

const app = express()
const PORT = process.env.PORT

async function main(){
    try{
        app.listen(PORT, () => console.log(`backend server listen on ${PORT} port`))

    }catch(err){
        console.log(err)
    }
}

main()