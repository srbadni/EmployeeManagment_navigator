import {CCardBody, CCard, CButton, CForm, CFormInput, CFormLabel, CCol} from "@coreui/react";
import {FC, Fragment, useState} from "react";
import CreateLayout, {usersProps} from "../../../HOC/createLayout";
import AuthService from "../../../service/auth/auth.service";
import {Link, useNavigate} from "react-router-dom";

const Create: FC<usersProps> = ({HandleChange, state, validate, setExplicitField}) => {
    const navigate = useNavigate();
    const HandleSubmit = async (e: any): Promise<void> => {
        e.preventDefault();
        await validate();
        if (!state.$all_source_errors.length) {
            AuthService.addCompany(state.$data).then((e) => {
                e?.status === 200 && navigate("/admin/companies/list")
            })
        }
    }

    return (
        <Fragment>
            <CCard>
                <CCardBody>
                    <CForm className={"row"} onSubmit={HandleSubmit}>
                        <legend>افزودن سازمان جدید</legend>
                        <CCol md={3} className="mb-3">
                            <CFormLabel htmlFor="name">نام سازمان</CFormLabel>
                            <span className={"text-danger ms-1"}>*</span>
                            <CFormInput onChange={HandleChange}
                                        name="name"
                                        onBlur={() => setExplicitField("name", true)}
                                        placeholder="نام سازمان"/>
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
                        <CCol className={'gap-2 d-flex'}>
                            <Link to={"/admin/companies/list"} className={'btn btn-light'}>بازگشت</Link>
                            <CButton color={"success"} type="submit">ثبت</CButton>
                        </CCol>
                    </CForm>
                </CCardBody>
            </CCard>
        </Fragment>
    )
}

export default CreateLayout(Create);
