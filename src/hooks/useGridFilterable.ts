import React, {ReactElement, useCallback} from "react";
import {CompositeFilterDescriptor, filterBy} from "@progress/kendo-data-query";
import {GridFilterCellProps, GridFilterChangeEvent, GridFilterOperators} from "@progress/kendo-react-grid";

interface useGridFilterableProps {
    initialFilter: CompositeFilterDescriptor;
    data: any[]
}

interface ExportUseGridFilterable {
    gridControlProps: () => any
}

const useGridFilterable = (props: useGridFilterableProps): ExportUseGridFilterable => {
    const [filter, setFilter] = React.useState(props.initialFilter);
    const gridControlProps = useCallback(() => {
        const filterOperators: GridFilterOperators = {
            text: [
                {text: 'grid.filterContainsOperator', operator: 'contains'},
                {text: 'grid.filterNotContainsOperator', operator: 'doesnotcontain'}
            ],
            numeric: [{text: "grid.filterEqOperator", operator: "eq"}],
            date: [{text: "grid.filterEqOperator", operator: "eq"}],
            boolean: [{text: "grid.filterEqOperator", operator: "eq"}],
        };

        const filterCellRender = (defaultRendering: ReactElement<any | null>, props: GridFilterCellProps) => {
            if (defaultRendering.props.children.props.children[1].props.children.props) {
                // @ts-ignore
                defaultRendering.props.children.props.children[1].props.children.props.data[0].text = "شامل میشود";
                defaultRendering.props.children.props.children[1].props.children.props.data[1].text = "شامل نمیشود";
                return defaultRendering
            }
            return []
        };

        return {
            onFilterChange: (e: GridFilterChangeEvent) => setFilter(e.filter),
            data: filterBy(props.data, filter),
            filterable: true,
            filterCellRender,
            filterOperators,
            filter,
        }
    }, [props.data, filter])

    return {
        gridControlProps
    }
}

export default useGridFilterable;
