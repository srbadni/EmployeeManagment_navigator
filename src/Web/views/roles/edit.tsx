import {CCardBody, CCard, CButton, CForm, CFormInput, CFormLabel} from "@coreui/react";
import {FC, Fragment, useEffect, useRef, useState} from "react";
import {ToastContainer} from "react-toastify";
import AuthService from "../../../service/auth/auth.service";
import EditRoleLayout, {editRoleProps} from "../../../HOC/editRoleLayout";
import {Link, useNavigate} from "react-router-dom";

const Edit: FC<editRoleProps> = ({form, handleChangeForm, spanval}) => {
    const navigate = useNavigate();
    const roleElement = useRef<any>();

    const HandleSubmit = (e: any) => {
        e.preventDefault();
        if (roleElement.current.value === '') return spanval.current.innerText = "وارد کردن نقش الزامی است"
        spanval.current.innerText = ""
        AuthService.editRole(form).then((e) => {
            e?.status === 200 && navigate("/admin/roles/list")
        })
    }

    return (
        <Fragment>
            <CCard>
                <CCardBody>
                    <CForm onSubmit={HandleSubmit}>
                        <fieldset>
                            <legend>{`ویرایش نقش`}</legend>
                            <div className="mb-3">
                                <CFormLabel htmlFor="displayName">نام نقش</CFormLabel>
                                <span className={"text-danger ms-1"}>*</span>
                                <CFormInput defaultValue={form.displayName}
                                            ref={roleElement}
                                            onChange={handleChangeForm}
                                            name="displayName"
                                            placeholder="نام"/>
                                <span ref={spanval} id={'text-validation'} className={'text-danger'}/>
                            </div>
                            <div className={'gap-2 d-flex'}>
                                <Link to={"/admin/roles/list"} className={'btn btn-light'}>بازگشت</Link>
                                <CButton color={"success"} type="submit">ثبت</CButton>
                            </div>
                        </fieldset>
                    </CForm>
                </CCardBody>
            </CCard>
        </Fragment>
    )
}

export default EditRoleLayout(Edit);
