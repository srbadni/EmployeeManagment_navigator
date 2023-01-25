import {useCallback, useEffect, useRef, useState} from "react";
import {UserSchema} from "../validators/users/users.schema";
import {toast} from "react-toastify";
import {IRole} from "../Models/AuthModels/Role";
import {addRolesSchema} from "../validators/roles/roles.schema";
import {useDispatch} from "react-redux";

//todo fix for all
export interface rolesProps {
    error: string | undefined | boolean;
    HandleSubmit: (value: any) => void;
    handleChangeForm: (value: any) => void;
    form: IRole;
    dispatch: any;
}

const CreateRoleLayout = (OldComponent: any) => {

    const Layout = (props: any) => {
        const [form, setForm] = useState<IRole>({
            displayName: "",
        })
        const [error, setError] = useState<string | boolean | undefined>(true)
        const dispatch = useDispatch();
        let firstCheck = useRef<boolean>(true);
        useEffect(() => {
            if (!firstCheck.current) {
                validateForm()
            } else
                firstCheck.current = false
        }, [form]);

        const validateForm = useCallback(() => {
            const {error, ...otherProps} = addRolesSchema.validate(form)
            if (error) {
                setError(error.message)
            } else setError(undefined)
        }, [form])

        function handleChangeForm(e: any) {
            setForm((lastForm: any) => ({...lastForm, [e.target.name]: e.target.value}))
            validateForm()
        }

        // 

        return <OldComponent
            form={form}
            handleChangeForm={handleChangeForm}
            error={error}
            dispatch={dispatch}
            {...props}/>
    };
    return Layout
}


export default CreateRoleLayout;