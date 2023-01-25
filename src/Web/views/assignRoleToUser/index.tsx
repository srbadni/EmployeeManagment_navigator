import React, {Fragment, useEffect, useState} from 'react';
import {CButton, CCard, CCardBody, CCol, CForm, CRow} from "@coreui/react";
import ApiService from "../../../service/api/api.service";
import {Link, useNavigate, useParams} from "react-router-dom";
import {IUserRoles} from "../../../Models/AuthModels/IUserRoles";
import Form from 'react-bootstrap/Form'

const Index = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<IUserRoles>({
        userName: "",
        userId: ""
    });

    useEffect(() => {
        ApiService.userRoles(id).then(res => {
            if (!res.data.selectedRolesIds)
                setData({...res.data, selectedRolesIds: []})
            else setData(res.data)
        })
    }, [id])
    const HandleChange = (e: any) => {
        setData((last) => ({...last, selectedRolesIds: [e.target.id]}))
    }

    const HandleRoleRemove = () => {
        setData((last) => ({...last, selectedRolesIds: []}))
    }


    const HandleSubmit = (e: any) => {
        e.preventDefault()
        ApiService.assignRoleToUser(data).then((e) => {
            e?.status === 200 && navigate("/admin/users/list")
        })
    }


    return (
        <Fragment>
            <CCard>
                <CCardBody>
                    <CForm onSubmit={HandleSubmit}>
                        <fieldset>
                            <h5 className={"mb-4"}>انتساب نقش به کاربر {data?.userName}</h5>
                            <CRow>
                                {
                                    data.roles ? data.roles?.map((item, index) => {
                                        return (
                                            <CCol xl={2} key={index} className="mb-3">
                                                <Form.Check
                                                    type={"radio"}
                                                    checked={data.selectedRolesIds?.includes(item.id)}
                                                    onChange={HandleChange}
                                                    id={item.id}
                                                    name={"radios"}
                                                    label={item.displayName}
                                                />
                                            </CCol>
                                        )
                                    }) : <p>نقشی وجود ندارد</p>
                                }
                            </CRow>
                            <div className={'gap-2 d-flex align-items-center'}>
                                <Link to={"/admin/users/list"} className={'btn btn-light'}>بازگشت</Link>
                                <CButton color={"success"} type="submit">ثبت</CButton>
                                <CButton onClick={HandleRoleRemove}
                                         color="danger"
                                         className={'text-white'}
                                >پاک کردن</CButton>
                            </div>
                        </fieldset>
                    </CForm>
                </CCardBody>
            </CCard>
        </Fragment>
    );
};

export default Index;
