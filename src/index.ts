import {app} from "../src/app";
import { signUpController } from "./controller/endpoint/signUpController";
import {AddressInfo} from "net";


//###############
//## Endpoints ##
//###############

app.post("/user/signup", signUpController)

//###############
//## Endpoints ##
//###############



export const server = app.listen(process.env.PORT || 3003, ()=>{
    const address = server.address() as AddressInfo;

    if(server){
        console.log(`Server is runing in http://localhost:${address.port}`)
    }else{
        console.log(`Error upon starting the Server`)
    }
})