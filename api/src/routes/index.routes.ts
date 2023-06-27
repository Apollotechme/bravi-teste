import { Router } from "express";
import { userApp } from "./user/user.routes";
import { contactApp } from "./contacts/contacts.routes";
import { sessionApp } from "./session/session.routes";

const routerApp = Router();

routerApp.use("/user", userApp);
routerApp.use("/contacts", contactApp);
routerApp.use("/session", sessionApp);

export { routerApp };
