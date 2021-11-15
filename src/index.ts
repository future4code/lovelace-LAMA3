import {app} from "../src/app";
import {AddressInfo} from "net";

//ENDPOINTS
import { signUpController } from "./controller/endpoint/signUpController";
import { bandRegisterController } from "./controller/endpoint/bandRegisterController";
import { getBandDetailsByIdOrNameController } from "./controller/endpoint/getBandDetailsByIdOrNameController";
import { addShowToADayController } from "./controller/endpoint/addShowToADayController";
import { getShowsController } from "./controller/endpoint/getShowsController";
import { loginData } from "./data/loginData";
import { loginController } from "./controller/endpoint/loginController";


//###############
//## Endpoints ##
//###############
app.post("/user/signup", signUpController)
app.post("/band/register", bandRegisterController)
app.post("/show/register", addShowToADayController)
app.post("/user/login", loginController)

app.get("/band/:id?",getBandDetailsByIdOrNameController)
app.get("/show/:week_day", getShowsController)
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
