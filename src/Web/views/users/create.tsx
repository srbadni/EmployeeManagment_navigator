import {CCardBody, CCard, CButton, CForm, CFormInput, CFormLabel, CCol} from "@coreui/react";
import {FC, Fragment} from "react";
import CreateLayout, {usersProps} from "../../../HOC/createLayout";
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../../../service/auth/auth.service";

const Create: FC<usersProps> = ({HandleChange, state, validate, setExplicitField}) => {
    const navigate = useNavigate();
    const HandleSubmit = async (e: any): Promise<void> => {
        e.preventDefault();
        await validate();
        if (!state.$all_source_errors.length) {
            AuthService.addUser(state.$data).then((e) => {
                e?.status === 200 && navigate("/admin/users/list")
            })
        }
    }

    return (
        <Fragment>
            <CCard>
                <CCardBody>
                    <CForm className={"row"} onSubmit={HandleSubmit}>
                        <legend>افزودن کاربر جدید</legend>
                        <CCol md={3} className="mb-3">
                            <CFormLabel htmlFor="name">نام</CFormLabel>
                            <span className={"text-danger ms-1"}>*</span>
                            <CFormInput onChange={HandleChange}
                                        name="name"
                                        onBlur={() => setExplicitField("name", true)}
                                        placeholder="نام"/>
                            <p className="text-danger">
                                {state.$errors.name?.map((data: any) => data.$message).join(",")}
                            </p>
                        </CCol>
                        <CCol md={3} className="mb-3">
                            <CFormLabel htmlFor="userName">نام کاربری</CFormLabel>
                            <span className={"text-danger ms-1"}>*</span>
                            <CFormInput onChange={HandleChange}
                                        name="userName"
                                        onBlur={() => setExplicitField("userName", true)}
                                        placeholder="نام کاربری"/>
                            <p className="text-danger">
                                {state.$errors.userName?.map((data: any) => data.$message).join(",")}
                            </p>
                        </CCol>
                        <CCol md={3} className="mb-3">
                            <CFormLabel htmlFor="password">رمز عبور</CFormLabel>
                            <span className={"text-danger ms-1"}>*</span>
                            <CFormInput onChange={HandleChange}
                                        name="password"
                                        type={"password"}
                                        onBlur={() => setExplicitField("password", true)}
                                        placeholder="رمز عبور"/>
                            <p className="text-danger">
                                {state.$errors.password?.map((data: any) => data.$message).join(",")}
                            </p>
                        </CCol>
                        <CCol md={3} className="mb-3">
                            <CFormLabel htmlFor="confirmPassword">تکرار رمز عبور</CFormLabel>
                            <span className={"text-danger ms-1"}>*</span>
                            <CFormInput onChange={HandleChange}
                                        name="confirmPassword"
                                        type={"password"}
                                        onBlur={() => setExplicitField("confirmPassword", true)}
                                        placeholder="تکرار رمز عبور"/>
                            <p className="text-danger">
                                {state.$errors.confirmPassword?.map((data: any) => data.$message).join(",")}
                            </p>
                        </CCol>
                        <CCol md={12} className={'gap-2 d-flex'}>
                            <Link to={"/admin/users/list"} className={'btn btn-light'}>بازگشت</Link>
                            <CButton color={"success"} type="submit">ثبت</CButton>
                        </CCol>
                    </CForm>
                </CCardBody>
            </CCard>
        </Fragment>
    )
}

export default CreateLayout(Create);
