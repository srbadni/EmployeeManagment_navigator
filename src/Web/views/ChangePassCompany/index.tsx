import {CCardBody, CCard, CButton, CForm, CFormInput, CFormLabel, CCol} from "@coreui/react";
import {Fragment} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useValidator} from "react-joi";
import {PasswordSchema, PasswordSchemaInitialValues} from "../../../validators/password/password.schema";
import ApiService from "../../../service/api/api.service";

const Create = () => {
    const {id = ""} = useParams();

    // @ts-ignore
    const {state, setData, setExplicitField, validate} = useValidator({
        initialData: PasswordSchemaInitialValues,
        schema: PasswordSchema,
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
    const navigate = useNavigate();
    const HandleSubmit = async (e: any): Promise<void> => {
        e.preventDefault();
        await validate();
        if (!state.$all_source_errors.length) {
            ApiService.companyChangePasswordByAdmin({...state.$data, id}).then((e) => {
                e?.status === 200 && navigate("/admin/companies/list")
            })
        }
    }

    return (
        <Fragment>
            <CCard>
                <CCardBody>
                    <CForm className={"row"} onSubmit={HandleSubmit}>
                        <legend>تغییر رمز عبور سازمان</legend>
                        <CCol md={3} className="mb-3">
                            <CFormLabel htmlFor="newPassword">رمز عبور جدید</CFormLabel>
                            <span className={"text-danger ms-1"}>*</span>
                            <CFormInput onChange={HandleChange}
                                        type={"password"}
                                        name="newPassword"
                                        onBlur={() => setExplicitField("newPassword", true)}
                                        placeholder="رمز"/>
                            <p className="text-danger">
                                {state.$errors.newPassword?.map((data: any) => data.$message).join(",")}
                            </p>
                        </CCol>
                        <CCol md={3} className="mb-3">
                            <CFormLabel htmlFor="confirmPassword">تکرار رمز عبور جدید</CFormLabel>
                            <span className={"text-danger ms-1"}>*</span>
                            <CFormInput onChange={HandleChange}
                                        type={"password"}
                                        name="confirmPassword"
                                        onBlur={() => setExplicitField("confirmPassword", true)}
                                        placeholder="رمز عبور"/>
                            <p className="text-danger">
                                {state.$errors.confirmPassword?.map((data: any) => data.$message).join(",")}
                            </p>
                        </CCol>
                        <CCol md={12} className={'gap-2 d-flex'}>
                            <Link to={"/admin/companies/list"} className={'btn btn-light'}>بازگشت</Link>
                            <CButton color={"success"} type="submit">ثبت</CButton>
                        </CCol>
                    </CForm>
                </CCardBody>
            </CCard>
        </Fragment>
    )
}

export default Create;
