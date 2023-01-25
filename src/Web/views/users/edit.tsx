import {CCardBody, CCard, CButton, CForm, CFormInput, CFormLabel} from "@coreui/react";
import {FC, Fragment, useState} from "react";
import EditLayout, {usersProps} from "../../../HOC/editLayout";
import AuthService from "../../../service/auth/auth.service";
import {Link, useNavigate} from "react-router-dom";

const Edit: FC<usersProps> = ({HandleChange, state, validate, theName, setExplicitField}) => {
    const navigate = useNavigate();
    const [disable, setDisable] = useState<boolean | undefined>();
    const HandleSubmit = async (e: any): Promise<void> => {
        e.preventDefault();
        await validate();
        if (!state.$all_source_errors.length) {
            AuthService.editUser(state.$data).then((e) => {
                e?.status === 200 && navigate("/admin/users/list")
            })
        }
    }

    return (
        <Fragment>
            <CCard>
                <CCardBody>
                    <CForm onSubmit={HandleSubmit}>
                        <fieldset>
                            <legend>{`ویرایش کاربر ${theName}`}</legend>
                            <div className="mb-3">
                                <CFormLabel htmlFor="name">نام</CFormLabel>
                                <span className={"text-danger ms-1"}>*</span>
                                <CFormInput defaultValue={state.$data.name}
                                            onKeyUp={HandleChange}
                                            onBlur={() => setExplicitField("name", true)} name="name"
                                            placeholder="نام"/>
                                <p className="text-danger">
                                    {state.$errors.name?.map((data: any) => data.$message).join(",")}
                                </p>
                            </div>
                            <div className="mb-3">
                                <CFormLabel htmlFor="userName">نام کاربری</CFormLabel>
                                <span className={"text-danger ms-1"}>*</span>
                                <CFormInput defaultValue={state.$data.userName}
                                            onKeyUp={HandleChange}
                                            onBlur={() => setExplicitField("userName", true)} name="userName"
                                            placeholder="نام کاربری"/>
                                <p className="text-danger">
                                    {state.$errors.userName?.map((data: any) => data.$message).join(",")}
                                </p>
                            </div>
                            {/*//todo error for edits*/}
                            <div className={'gap-2 d-flex'}>
                                <Link to={"/admin/users/list"} className={'btn btn-light'}>بازگشت</Link>
                                <CButton color={"success"} type="submit">ثبت</CButton>
                            </div>
                        </fieldset>
                    </CForm>
                </CCardBody>
            </CCard>
        </Fragment>
    )
}

export default EditLayout(Edit);
