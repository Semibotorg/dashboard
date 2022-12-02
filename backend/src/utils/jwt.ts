import jwt from 'jsonwebtoken'
import { UserJWT } from './'
export function decodeJWT(token: string): UserJWT{
    let decoded: UserJWT | any
try{
     decoded = jwt.verify(token, process.env.JWT_PASSWORD!)
    
}catch(err){
    console.log(err)
}
return decoded
}