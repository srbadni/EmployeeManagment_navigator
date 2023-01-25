import {Grid, GridColumn, GridNoRecords} from '@progress/kendo-react-grid';
import React, {Fragment, useEffect, useState} from "react";
import ApiService from "../../../service/api/api.service";
import useGridFilterable from "../../../hooks/useGridFilterable";

const EmployeesLogs = () => {

    const [DataFetch, setDataFetch] = useState([]);
    useEffect(() => {
        ApiService.getEmployeesLogs().then((res) => {
            setDataFetch(res.data);
        })
    }, [])

    const initialFilter = {
        logic: "and",
        filters: [],
    };

    const {gridControlProps} = useGridFilterable({
        data: DataFetch,
        initialFilter
    });

    return (
        <Fragment>
            <Grid
                className={'non-has-last'}
                style={{
                    height: "550px",
                }}
                {...gridControlProps()}
            >
                <GridNoRecords>
                    لاگی وجود ندارد
                </GridNoRecords>
                <GridColumn width={'150px'} field="logType" title="نوع لاگ"/>
                <GridColumn field="message" title="پیام"/>
                <GridColumn width={'150px'} field="createdDate" title="تاریخ"/>
            </Grid>
        </Fragment>
    )
}

export default EmployeesLogs;

