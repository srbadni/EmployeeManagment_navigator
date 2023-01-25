import {useState} from "react";
import {UserSchema, UserSchemaInitialValues} from "../validators/users/users.schema";
import {useValidator} from "react-joi"

export interface usersProps {
    HandleChange: any;
    state: any;
    validate: any;
    setExplicitField: any;
}

const CreateLayout = (OldComponent: any) => {
    const Layout = (props: any) => {
        const [disable, setDisable] = useState<boolean>(false);
        // @ts-ignore
        const {state, setData, setExplicitField, validate} = useValidator({
            initialData: UserSchemaInitialValues,
            schema: UserSchema,
            validationOptions: {
                abortEarly: true
            },
        })

        const HandleChange = (e: any) => {
            // react < v17
            e.persist()

            setData((old: any) => ({
                ...old,
                [e.target.name]: e.target.value,
            }))
        }


        return <OldComponent
            HandleChange={HandleChange}
            state={state}
            validate={validate}
            setExplicitField={setExplicitField}
            {...props}/>
    };
    return Layout
}


export default CreateLayout;