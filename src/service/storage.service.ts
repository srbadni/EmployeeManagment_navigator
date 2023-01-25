import {TokenData} from "../Models/AuthModels/TokenData";

const TOKEN_KEY = "token";

export default class StorageService {

    static getToken() {
        return localStorage.getItem(TOKEN_KEY)
    }

    static setToken(token: any) {
        return localStorage.setItem(TOKEN_KEY, token)
    }

    static removeToken() {
        return localStorage.removeItem(TOKEN_KEY)
    }

}
