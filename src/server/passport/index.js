import passport from "passport";
import UserModel from "../mongodb/models/user";

passport.use(UserModel.createStrategy());
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

export default passport;
