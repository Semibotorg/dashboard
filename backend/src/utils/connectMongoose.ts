import mongoose from 'mongoose'
import cls from 'cli-color'
export async function connectMongoose(url: any){
    mongoose.connect(url).then(() => {
        console.log(`${cls.green('[MONGOOSE]')} Connected`)
    }).catch(err => {
        console.log(`${cls.red('[MONGOOSE]')} Error`)
        console.log(err)
    })
}