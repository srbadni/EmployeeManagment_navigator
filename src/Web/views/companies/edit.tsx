import {CCardBody, CCard, CButton, CForm, CFormInput, CFormLabel} from "@coreui/react";
import {FC, Fragment, useState} from "react";
import EditLayout, {usersProps} from "../../../HOC/editLayout";
import AuthService from "../../../service/auth/auth.service";
import {Link, useNavigate} from "react-router-dom";

const Edit: FC<usersProps> = ({HandleChange, state, validate, theName, setExplicitField}) => {
    const navigate = useNavigate();
    const [disable, setDisable] = useState<boolean | undefined>();

    const HandleSubmit = (e: any) => {
        e.preventDefault();
        validate();
        if (!state.$all_source_errors.length) {
            AuthService.editCompany(state.$data).then((e) => {
                e?.status === 200 && navigate("/admin/companies/list")
            })
        }
    }

    return (
        <Fragment>
            <CCard>
                <CCardBody>
                    <CForm onSubmit={HandleSubmit}>
                        <fieldset>
                            <legend>{`ویرایش سازمان ${theName}`}</legend>
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
                            <div className={'gap-2 d-flex'}>
                                <Link to={"/admin/companies/list"} className={'btn btn-light'}>بازگشت</Link>
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
