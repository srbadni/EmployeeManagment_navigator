import {Grid, GridColumn, GridNoRecords} from '@progress/kendo-react-grid';
import React, {Fragment, MouseEventHandler, useEffect, useState} from "react";
import {
    CDropdownItem,
    CDropdown,
    CDropdownMenu,
    CDropdownToggle,
    CModal,
    CModalHeader,
    CModalTitle, CModalBody, CModalFooter, CButton
} from "@coreui/react";
import {Link} from "react-router-dom";
import AuthService from "../../../service/auth/auth.service";
import {IRole} from "../../../Models/AuthModels/Role";
import {CompositeFilterDescriptor} from "@progress/kendo-data-query";
import useGridFilterable from "../../../hooks/useGridFilterable";
import StorageService from "../../../service/storage.service";

const Roles = () => {

    const [Data, setData] = useState<IRole[]>([]);
    const [flag, setFlag] = useState<boolean>(false);
    const [visible, setVisible] = useState(false)
    const [currentId, setCurrentId] = useState("")
    const [Message, setMessage] = useState("")

    useEffect(() => {
        AuthService.getRoles().then(res => {
            setData(res.data);
        })
    }, [flag])

    const HandleDeleteItem = (id: string) => {
        AuthService.removeRole(id).then(res => {
            setFlag(true)
            setVisible(false)
        })
    }

    const CommandCell = (props: any) => (
        <td>
            <CDropdown className={"position-static"}>
                <CDropdownToggle color="light">عملیات</CDropdownToggle>
                <CDropdownMenu>
                    <Link className={'dropdown-item'}
                          to={`/admin/rolePermissions/assignPermissionsToRoles/${props.dataItem.id}`}>انتساب
                        سطح دسترسی</Link>
                    <Link className={'dropdown-item'}
                          to={`/admin/roles/edit/${props.dataItem.id}`}>ویرایش نقش</Link>
                    <div className={'dropdown-item'}
                         onClick={async () => {
                             // @ts-ignore
                             const req = await fetch(`${BASE_URL_NAVIGATOR}/roles/ask/remove/${props.dataItem.id}`, {
                                 headers: {
                                     authorization: 'Bearer ' + StorageService.getToken()
                                 }
                             });
                             const {message} = await req.json();
                             setMessage(message)
                             setVisible(!visible)
                             setCurrentId(props.dataItem.id)
                         }}>حذف نقش
                    </div>
                </CDropdownMenu>
            </CDropdown>
        </td>
    );

    const initialFilter: CompositeFilterDescriptor = {
        logic: "and",
        filters: [],
    };
    const {gridControlProps} = useGridFilterable({
        data: Data,
        initialFilter
    });

    return (
        <Fragment>
            <Grid
                style={{
                    height: "550px",
                }}
                {...gridControlProps()}
            >
                <GridNoRecords>
                    نقشی وجود ندارد
                </GridNoRecords>
                <GridColumn field="displayName" title="نام"/>
                <GridColumn field="createDate" title="تاریخ ایجاد"/>
                <GridColumn cell={CommandCell} width="240px" title="عملیات"/>
            </Grid>
            {Message && <CModal visible={visible} onClose={() => setVisible(false)}>
                    {/*// @ts-ignore*/}
                    <CModalHeader onClose={() => setVisible(false)}>
                        <CModalTitle>هشدار</CModalTitle>
                    </CModalHeader>
                    <CModalBody>{Message}</CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => setVisible(false)}>
                            انصراف
                        </CButton>
                        <CButton onClick={() => {
                            HandleDeleteItem(currentId)
                        }} color="danger" style={{color: "white"}}>حذف</CButton>
                    </CModalFooter>
                </CModal>}
        </Fragment>
    )
}

export default Roles;
