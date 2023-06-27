import { Router } from "express";
import { userApp } from "./user/user.routes";
import { contactApp } from "./contacts/contacts.routes";

const routerApp = Router();

routerApp.use("/user", userApp);
routerApp.use("/contacts", contactApp);

export { routerApp };
