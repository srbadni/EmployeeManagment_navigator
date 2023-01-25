import {useCallback, useEffect, useRef, useState} from "react";
import {UserSchema} from "../validators/users/users.schema";
import {useParams} from "react-router-dom";
import AuthService from "../service/auth/auth.service";
import {IRole} from "../Models/AuthModels/Role";

export interface editRoleProps {
    error: string | undefined | boolean;
    HandleSubmit: (value: any) => void;
    handleChangeForm: (value: any) => void;
    spanval: any;
    form: IRole;
}

const EditRoleLayout = (OldComponent: any) => {

    const Layout = (props: any) => {
        const spanval = useRef<any>();
        const {id} = useParams();
        const [form, setForm] = useState<IRole>({
            id: id,
            displayName: ""
        })
        const [error, setError] = useState<string | boolean | undefined>(true)
        let firstCheck = useRef<boolean>(true);
        useEffect(() => {
            AuthService.getRoleById(id).then(res => {
                setForm((last) => ({...last, displayName: res.data.displayName}))
            })
        }, [id])

        const validateForm = useCallback(() => {
            const {error, ...otherProps} = UserSchema.validate(form)
            if (error) {
                setError(error.message)
            } else setError(undefined)
        }, [form])

        useEffect(() => {
            if (!firstCheck.current) {
                validateForm()
            } else
                firstCheck.current = false
        }, [form, validateForm]);


        function handleChangeForm(e: any) {
            if (spanval) spanval.current.innerText = ""
            setForm((lastForm: any) => ({...lastForm, [e.target.name]: e.target.value}))
            validateForm()
        }


        return <OldComponent
            form={form}
            handleChangeForm={handleChangeForm}
            error={error}
            spanval={spanval}
            {...props}/>
    };
    return Layout
}


export default EditRoleLayout;
