import {Grid, GridColumn, GridNoRecords} from '@progress/kendo-react-grid';
import React, {Fragment, useEffect, useState} from "react";
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/react";
import ApiService from "../../../service/api/api.service";
import {Link} from "react-router-dom";
import {ICompany} from "../../../Models/AuthModels/Companies";
import AuthService from "../../../service/auth/auth.service";
import {CompositeFilterDescriptor} from "@progress/kendo-data-query";
import useGridFilterable from "../../../hooks/useGridFilterable";

interface gridColumnsChildren {
    dataItem: Record<"id", string>;
}

const Companies = () => {

    const [CompaniesDataFetch, setCompaniesDataFetch] = useState<ICompany[]>([]);

    useEffect(() => {
        ApiService.getCompanies().then((res) => {
            setCompaniesDataFetch(res.data);
        }).catch(err => {
        })
    }, [])

    const CommandCell:React.FC<gridColumnsChildren> = (props) => (
        <td>
            <CDropdown className={"position-static"}>
                <CDropdownToggle color="light">عملیات</CDropdownToggle>
                <CDropdownMenu>
                    <Link className={'dropdown-item'}
                          to={`/admin/company/edit/${props.dataItem.id}`}
                    >ویرایش</Link>
                    <Link className={'dropdown-item'}
                          to={`/admin/company/employees/${props.dataItem.id}`}
                    >لیست کارکنان شرکت</Link>
                    <Link className={'dropdown-item'}
                          to={`/admin/company/change-password-company/${props.dataItem.id}`}
                    >تغییر رمز عبور</Link>
                    <CDropdownItem className={'dropdown-item'}
                                   onClick={() => {
                                       ApiService.companyChangeStatus(props.dataItem.id).then(() => {
                                           return ApiService.getCompanies()
                                       }).then((res) => {
                                           setCompaniesDataFetch(res.data);
                                       })
                                   }}>
                        تغییر وضعیت
                    </CDropdownItem>
                </CDropdownMenu>
            </CDropdown>
        </td>
    );

    const initialFilter: CompositeFilterDescriptor = {
        logic: "and",
        filters: [],
    };
    const {gridControlProps} = useGridFilterable({
        data: CompaniesDataFetch,
        initialFilter
    });

    return (
        <Fragment>
            <Grid
                sortable={true}
                style={{
                    height: "550px",
                }}
                {...gridControlProps()}
            >
                <GridNoRecords>
                    سازمانی وجود ندارد
                </GridNoRecords>
                <GridColumn field="name" title="نام شرکت"/>
                <GridColumn field="userName" title="نام کاربری"/>
                <GridColumn field="createdDate" title="تاریخ ایجاد"/>
                <GridColumn field="isActive" title="وضعیت"/>
                <GridColumn cell={CommandCell} width="240px" title="عملیات"/>
            </Grid>
        </Fragment>
    )
}

export default Companies;
