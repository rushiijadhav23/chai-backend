// app would be with express while db will be with mongoose
import express from "express";
import cors from "cors"
import cookieParse from "cookie-parser"; 

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
})); 

/* Data to kahise bhi aaskta hai backend ke pass;
- like forms se aaya
- then json aaya( we need to limit the incoming jason to nai to server crash)
for this we need to set some settings in middleware which helps us
*/
app.use(express.json({limit: "16kb"}))

// now i also want the data from url (thodasa issue aata hai)
// - like some data in params can have "%20" and all
app.use(express.urlencoded({extended: true, limit: "16kb"})) // extended means obj ke andar obj

// some public assests that we need to access is stored here.
app.use(express.static("public"))

// cookieparser is used to access the users browser cookies and set-it(crud on cookies)
app.use(cookieParse());

export { app }