import {CCardBody, CCard, CButton, CFormInput, CFormLabel} from "@coreui/react";
import {FC, Fragment, useState} from "react";
//todo remove extra dependency
import AuthService from "../../../service/auth/auth.service";
import CreateRoleLayout, {rolesProps} from "../../../HOC/createRoleLayout";
import {Link, useNavigate} from "react-router-dom";

const Create: FC<rolesProps> = ({error, form, handleChangeForm, dispatch}) => {
    const navigate = useNavigate();
    const [disable, setDisable] = useState<boolean | undefined>();

    const HandleSubmit = () => {
        setDisable(true)
        AuthService.addRoles(form).then((e) => {
            setDisable(undefined)
            e?.status === 200 && navigate("/admin/roles/list")
        })
    }

    return (
        <Fragment>
            <CCard>
                <CCardBody>
                    <h4>افزودن نقش جدید</h4>
                    <div className="mb-3">
                        <CFormLabel htmlFor="displayName">نام نقش</CFormLabel>
                        <span className={"text-danger ms-1"}>*</span>
                        <CFormInput onChange={handleChangeForm} name="displayName" placeholder="نام نقش"/>
                    </div>
                    <p className={'text-danger'}>{error}</p>
                    <div className={'gap-2 d-flex'}>
                        <Link to={"/admin/roles/list"} className={'btn btn-light'}>بازگشت</Link>
                        <CButton disabled={disable || !!error} onClick={HandleSubmit} color={"success"} type="submit">ثبت</CButton>
                    </div>
                </CCardBody>
            </CCard>
        </Fragment>
    )
}

export default CreateRoleLayout(Create);
