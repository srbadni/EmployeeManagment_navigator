import React, {Fragment, useEffect, useState} from 'react';
import {CButton, CCard, CCardBody, CForm} from "@coreui/react";
import ApiService from "../../../service/api/api.service";
import {Link, useNavigate, useParams} from "react-router-dom";
import Form from 'react-bootstrap/Form'
import {IRolePermission} from "../../../Models/AuthModels/RolePermission";

const Index = () => {
    const navigate = useNavigate();
    const [disable, setDisable] = useState<boolean | undefined>();
    const [data, setData] = useState<IRolePermission>({
        displayName: "",
        roleId: "",
        permissions: []
    });
    useEffect(() => {
        ApiService.allPermissions(id).then(res => {
            if (!res.data.selectedPermissionsIds)
                setData({...res.data, selectedPermissionsIds: []})
            else
                setData(res.data)
        })
    }, [])
    const {id} = useParams();

    const HandleChange = (e: any) => {
        let result: IRolePermission["selectedPermissionsIds"];
        if (!data.selectedPermissionsIds?.includes(e.target.id)) {
            result = data.selectedPermissionsIds;
            result?.push(e.target.name);
            setData((last) => ({...last, selectedPermissionsIds: result}))
        } else {
            result = data.selectedPermissionsIds.filter((item) => {
                return item !== e.target.id;
            })
            setData({...data, selectedPermissionsIds: result})
        }
    }


    const HandleSubmit = (e: any) => {
        setDisable(true)
        e.preventDefault()
        ApiService.assignPermissionsToRole(data).then((e) => {
            setDisable(undefined)
            e?.status === 200 && navigate("/admin/roles/list")
        })
    }


    return (
        <Fragment>
            <CCard>
                <CCardBody>
                    <CForm onSubmit={HandleSubmit}>
                        <fieldset>
                            <h5>انتساب سطح دسترسی به نقش : {data?.displayName}</h5>
                            {
                                data?.permissions?.map((item, index) => {
                                    return (
                                        <div key={index} className="mb-3">
                                            <Form.Check
                                                checked={data?.selectedPermissionsIds?.includes(item.id)}
                                                type={"checkbox"}
                                                onChange={HandleChange}
                                                id={item.id}
                                                name={item.id}
                                                label={item.displayValue}
                                            />
                                        </div>
                                    )
                                })
                            }
                            <div className={'gap-2 d-flex'}>
                                <Link to={"/admin/roles/list"} className={'btn btn-light'}>بازگشت</Link>
                                <CButton color={"success"} type="submit">ثبت</CButton>
                            </div>
                        </fieldset>
                    </CForm>
                </CCardBody>
            </CCard>
        </Fragment>
    );
};

export default Index;
