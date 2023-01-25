import {Grid, GridColumn, GridNoRecords, GridToolbar} from '@progress/kendo-react-grid';
import {ExcelExport} from "@progress/kendo-react-excel-export";
import React, {Fragment, useEffect, useState} from "react";
import ApiService from "../../../service/api/api.service";
import {
    CompositeFilterDescriptor,
} from "@progress/kendo-data-query";
import useGridFilterable from "../../../hooks/useGridFilterable";

const RelativesList = () => {

    const [DataFetch, setDataFetch] = useState<any[]>([]);
    useEffect(() => {
        ApiService.getAllRelativesCompany().then((res) => {
            // only here
            setDataFetch(res.data.data);
        }).catch(err => {
        })
    }, [])

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
        data: DataFetch,
        initialFilter
    });

    return (
        <Fragment>
            <ExcelExport data={DataFetch} ref={_export} dir='rtl'>
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
                        عضوی وجود ندارد
                    </GridNoRecords>
                    <GridColumn width="150px" field="headmanName" title="سرپرست"/>
                    <GridColumn width="150px" field="companyName" title="نام شرکت"/>
                    <GridColumn width="150px" field="firstName" title="نام"/>
                    <GridColumn width="150px" field="lastName" title="نام خانوادگی"/>
                    <GridColumn width="150px" field="kinshipString" title="نسبت"/>
                    <GridColumn width="150px" field="genderString" title="جنسیت"/>
                    <GridColumn width="150px" field="birthDate" title="تاریخ تولد"/>
                    <GridColumn width="150px" field="age" title="سن"/>
                    <GridColumn width="150px" field="grade" title="مقطع تحصیلی"/>
                    <GridColumn width="150px" field="semesterGrade" title="نمره کارنامه تحصیلی"/>
                </Grid>
            </ExcelExport>
        </Fragment>
    )
}

export default RelativesList;
