import {Grid, GridColumn, GridNoRecords} from '@progress/kendo-react-grid';
import React, {Fragment, useEffect, useState} from "react";
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/react";
import {IUser} from "../../../Models/AuthModels/User";
import {Link} from "react-router-dom";
import AuthService from "../../../service/auth/auth.service";
import ApiService from "../../../service/api/api.service";
import {CompositeFilterDescriptor} from "@progress/kendo-data-query";
import useGridFilterable from "../../../hooks/useGridFilterable";

const Users = () => {

    const [dataFetch, setDataFetch] = useState<IUser[]>([]);
    useEffect(() => {
        AuthService.getUser().then((res) => {
            setDataFetch(res?.data);
        })
    }, [])

    const CommandCell = (props: any) => (
        <td>
            <CDropdown className={"position-static"}>
                <CDropdownToggle color="light">عملیات</CDropdownToggle>
                <CDropdownMenu>
                    <Link className={'dropdown-item'}
                          to={`/admin/assignRoleToUser/${props.dataItem.id}`}>انتساب نقش به کاربر</Link>
                    <Link className={'dropdown-item'}
                          to={`/admin/users/info-edit/${props.dataItem.id}`}
                    >ویرایش</Link>
                    <Link className={'dropdown-item'}
                          to={`/admin/users/change-password-user/${props.dataItem.id}`}
                    >تغییر رمز عبور</Link>
                    <CDropdownItem className={'dropdown-item'}
                                   onClick={() => {
                                       ApiService.userChangeStatus(props.dataItem.id).then(() => {
                                           return AuthService.getUser()
                                       }).then((res) => {
                                           setDataFetch(res?.data);
                                       })
                                   }}>
                        تغییر وضعیت
                    </CDropdownItem>
                </CDropdownMenu>
            </CDropdown>
        </td>
    );

    const roleCell = (props: any) => {
        return (<td>
            {props.dataItem.roleName || "نقشی ندارد"}
        </td>)
    }

    const initialFilter: CompositeFilterDescriptor = {
        logic: "and",
        filters: [],
    };
    const {gridControlProps} = useGridFilterable({
        data: dataFetch,
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
                    کاربری وجود ندارد
                </GridNoRecords>
                <GridColumn field="name" title="نام"/>
                <GridColumn field="userName" title="نام کاربری"/>
                <GridColumn field="createdDate" title="تاریخ ایجاد"/>
                <GridColumn cell={roleCell} title="نقش کاربر"/>
                <GridColumn field="isActive" title="وضعیت"/>
                <GridColumn cell={CommandCell} width="240px" title="عملیات"/>
            </Grid>
        </Fragment>
    )
}

export default Users;
