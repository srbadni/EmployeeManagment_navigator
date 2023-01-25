import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {EditUserSchemaInitialValues, EditUserSchema} from "../validators/users/users.schema";
import AuthService from "../service/auth/auth.service";
import {useValidator} from "react-joi"

export interface usersProps {
    HandleChange: any;
    state: any;
    validate: any;
    id: string;
    setExplicitField: any;
    theName: string;
}

const EditLayout = (OldComponent: any) => {

    const Layout = (props: any) => {
        const [theName, setTheName] = useState<string>("");
        const {id} = useParams();
        const [disable, setDisable] = useState<boolean>(false);
        const navigate = useNavigate();
        // @ts-ignore
        const {state, setData, setExplicitField, validate} = useValidator({
            initialData: EditUserSchemaInitialValues,
            schema: EditUserSchema,
            validationOptions: {
                abortEarly: true
            },
        })

        useEffect(() => {
            AuthService.getUserById(id).then(result => {
                setData({
                    name: result.data.name,
                    id: result.data.id,
                    userName: result.data.userName
                })
                setTheName(result.data.name)
            })
        }, [])

        const HandleChange = (e: any) => {
            // react < v17
            e.persist()

            setData((old: any) => ({
                ...old,
                [e.target.name]: e.target.value,
            }))
        }


        return <OldComponent
            id={id}
            HandleChange={HandleChange}
            state={state}
            validate={validate}
            theName={theName}
            setExplicitField={setExplicitField}
            {...props}/>
    };
    return Layout
}


export default EditLayout;