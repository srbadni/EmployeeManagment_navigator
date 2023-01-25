import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICompany} from "../../Models/AuthModels/Companies";
import StorageService from "../../service/storage.service";
import {IPermission} from "../../Models/AuthModels/Permission";

type AuthStoreState = {
    token: string | undefined,
    userId: string | undefined,
    userName: string | undefined,
    companyId: ICompany["id"] | undefined,
    permissions: string[]
    roleName: string[]
}


const slice = createSlice({
    name: "auth",
    initialState: {
        token: StorageService.getToken(),
        userId: '',
        companyId: "",
        userName: "",
        permissions: [],
        roleName: []
    } as AuthStoreState,
    reducers: {
        //todo separate login and companyLogin
        login: (store, action: PayloadAction<string>) => {
            store.token = action.payload
            // todo implement storage service
            localStorage.setItem("token", action.payload)
        },
        logout: (store) => {
            store.token = undefined;
            StorageService.removeToken()
            // @ts-ignore
            window.location.href = `${AUTH_URL}`
        },
        setPermissions: (store, action: PayloadAction<IPermission[]>) => {
            store.permissions = action.payload.map(item => {
                return item.value
            });
        },
        setCompanyId: (store, action: PayloadAction<ICompany["id"]>) => {
            store.companyId = action.payload;
        },
        addRoleName: (store, action: PayloadAction<string[]>) => {
            store.roleName = action.payload;
        },
        setUserId: (store, action: PayloadAction<string>) => {
            store.userId = action.payload;
        },
        setUserName: (store, action: PayloadAction<string>) => {
            store.userName = action.payload;
        },
    },
})

export default slice.reducer;
export const {logout, login,setUserName, setPermissions,setUserId, setCompanyId, addRoleName} = slice.actions
