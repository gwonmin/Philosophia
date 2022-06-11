import { authModel } from "../schemas/auth";

class Auth {
    static async addAuth(newAuth){
        const addnewAuth = await authModel.create(newAuth);
        return addnewAuth;
    }

    static async findByEmail({ email }){
        const auth = await authModel.findOne({ email });
        return auth;
    }
}

export { Auth };