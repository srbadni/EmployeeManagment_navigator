import axios from 'axios';
import StorageService from "./storage.service";
import store from '../store'
import {callErrorToast, callSuccessToast} from "../store/slice/requestMessageHandle.slice";

const http = axios.create({
    // @ts-ignore
    baseURL: BASE_URL_NAVIGATOR,
    headers: {
        authorization: 'Bearer ' + StorageService.getToken()
    }
})

//disable until loading
http.interceptors.request.use((req) => {
    document.querySelectorAll('button').forEach(button => {
        button.disabled = true
    })
    return req
})

http.interceptors.response.use((response) => {
    store.dispatch(callSuccessToast(response.data.message))
    document.querySelectorAll('button').forEach(button => {
        button.disabled = false
    })
    return response
}, err => {
    if (!Array.isArray(err.response.data.message)) {
        store.dispatch(callErrorToast(err.response.data.message))
    } else if (err.response.status >= 500) {
        store.dispatch(callErrorToast("خطای سیستمی"))
    } else {
        err.response.data.message.forEach((item: any) => {
            store.dispatch(callErrorToast(item.error))
        })
    }
    document.querySelectorAll('button').forEach(button => {
        button.disabled = false
    })
})

export default {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch,
}
