import {Grid, GridColumn, GridNoRecords, GridToolbar} from '@progress/kendo-react-grid';
import {ExcelExport} from "@progress/kendo-react-excel-export";
import React, {Fragment, useEffect, useState} from "react";
import ApiService from "../../../service/api/api.service";
import {useParams} from "react-router-dom";
import {IEmployees} from "../../../Models/AuthModels/IEmployees";
import {CompositeFilterDescriptor} from "@progress/kendo-data-query";
import useGridFilterable from "../../../hooks/useGridFilterable";

const Employees = () => {

    const [EmployeesDataFetch, setEmployeesDataFetch] = useState<IEmployees[]>([]);
    const {id} = useParams();

    useEffect(() => {
        ApiService.getEmployees(id).then((res) => {
            // @ts-ignore
            // only here
            setEmployeesDataFetch(res.data.data);
        }).catch(err => {
        })
    }, [id])

    const _export = React.useRef<ExcelExport | null>(null);
    const excelExport = () => {
        if (_export.current !== null) {
            _export.current.save();
        }
    };

    const initialFilter: CompositeFilterDescriptor = {
        logic: "and",
        filters: [],
    };
    const {gridControlProps} = useGridFilterable({
        data: EmployeesDataFetch,
        initialFilter
    });

    return (
        <Fragment>
            <ExcelExport data={EmployeesDataFetch} ref={_export} dir='rtl'>
                <Grid
                    className={'non-has-last'}
                    style={{
                        height: "550px",
                    }}
                    {...gridControlProps()}
                >
                    <GridToolbar>
                        <button
                            title="خروجی اکسل"
                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                            onClick={excelExport}
                        >
                            خروجی اکسل
                        </button>
                    </GridToolbar>
                    <GridNoRecords>
                        کارمندی وجود ندارد
                    </GridNoRecords>
                    <GridColumn width={'150px'} field="firstName" title="نام"/>
                    <GridColumn width={'150px'} field="lastName" title="نام خانوادگی"/>
                    <GridColumn width={'150px'} field="post" title="سمت"/>
                    <GridColumn width={'150px'} field="isMaried" title="وضعیت تاهل"/>
                    <GridColumn field="gender" width="150" title="جنسیت"/>
                    <GridColumn width={'150px'} field="fatherName" title="نام پدر"/>
                    <GridColumn width={'160px'} field="nationalCode" title="کد ملی"/>
                    <GridColumn width={'150px'} field="birthDate" title="تاریخ تولد"/>
                    <GridColumn width={'150px'} field="dateOfBecomeEmployee" title="تاریخ استخدام"/>
                    <GridColumn width={'150px'} field="phoneNumber" title="شماره تماس"/>
                    <GridColumn width="190px" field="acoountNumber1" title="شماره حساب پست بانک"/>
                    <GridColumn width="190px" field="acoountNumber2" title="شماره حساب بانک مهر"/>
                    <GridColumn width="190px" field="acoountNumberOther" title="شماره حساب بانک رسالت"/>
                    <GridColumn width="180px" field="insuranceNumber" title="شماره بیمه"/>
                    <GridColumn width={'200px'} field="address" title="آدرس"/>
                    <GridColumn width={'150px'} field="placeOfBirth" title="محل تولد"/>
                    <GridColumn width={'150px'} field="isActive" title="وضعیت"/>
                </Grid>
            </ExcelExport>
        </Fragment>
    )
}

export default Employees;
