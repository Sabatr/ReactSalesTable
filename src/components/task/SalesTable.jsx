import React from "react";
import {
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableHead,
    TablePagination,
    IconButton,
    Card,
    CardHeader,
    CardContent,
    Tooltip,
    TableSortLabel, TableFooter
} from "@material-ui/core";
import importedData from '../data/data.js'
import FilterMenu from './table_options/FilterMenu'
import FooterActions from './table_options/FooterActions'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchField from "./SearchField";

/**
 * An implementation of a sales table using ReactJS and Material-UI
 * 
 * My summary and findings:
 * 
 * When fetching the JSON data, I found out that I couldn't access it directly without it throwing an error. This is why
 * I decided to check if it is null before adding it to my table. It was also quite strange when loading the data
 * that the returned data did not show up. I'm assuming because it just thought of it as a boolean rather than a value to be displayed.
 * 
 * 
 * @author Brian Nguyen
 */

class SalesTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalData: [],
            data: [],
            anchor: null,
            isOpen: false,
            text: "",
            showReturn: false,
            sort: 'desc',
            currency: "All",
            rowsPerPage: 5,
            page: 0
        }
        this.handleOptionsClick = this.handleOptionsClick.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleTableUpdate = this.handleTableUpdate.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleReturnedOption = this.handleReturnedOption.bind(this);
        this.makeCopy = this.makeCopy.bind(this);
        this.handleCurrency = this.handleCurrency.bind(this);
        this.handleSortClick = this.handleSortClick.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.getEmptyRows = this.getEmptyRows.bind(this);
        this.getFooter = this.getFooter.bind(this);
    }

    componentDidMount() {
        // fetch("http://www.mocky.io/v2/5d4caeb23100000a02a95477")
        //     .then(response => response.json())
        //     .then(response => this.setState({ data: response }))
        //     .then(this.makeCopy);

        // If I have no internet
        this.setState({
            data: importedData,
            originalData: importedData
        })
    }

    render() {
        return (
            <Card>
                <CardHeader
                    style={{backgroundColor: 'lightblue'}}
                    action={
                        <div>
                            <SearchField
                                data={this.state.data}
                                originalData={this.state.originalData}
                                updateTable={this.handleTableUpdate}
                                handleChange={this.handleFieldChange}
                                text={this.state.text}
                                showReturned={this.state.showReturn}
                                changePage={this.handleChangePage} />
                            <FilterMenu
                                anchor={this.state.anchor}
                                onClose={this.handleMenuClose}
                                isOpen={this.state.isOpen}
                                originalData={this.state.originalData}
                                data={this.state.data}
                                updateData={this.handleTableUpdate}
                                handleReturned={this.handleReturnedOption}
                                text={this.state.text}
                                checked={this.state.showReturn}
                                rates={this.props.rates}
                                currencyHandler={this.handleCurrency}
                                currency={this.state.currency}
                                changePage={this.handleChangePage}
                            />
                            <Tooltip title="Settings">
                            <IconButton
                                aria-label="more"
                                aria-haspopup="true"
                                style={{ float: 'right' }}
                                onClick={this.handleOptionsClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                            </Tooltip>

                        </div>
                    }
                    title="Sales Table"
                    />
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {this.createHeadings().map((value, i) =>
                                    <TableCell key={`heading_${i}`}>
                                        <Tooltip title={this.state.sort}>
                                        <TableSortLabel
                                            direction={this.state.sort}
                                            onClick={() => this.handleSortClick(value)}
                                        >
                                            {value}
                                        </TableSortLabel>
                                        </Tooltip>
                                    </TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.getData()
                                    .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                    .map((data, i) =>
                                        <TableRow key={`row_${i}`}>
                                            {Object.values(data).map((tableData, inc) =>
                                                <TableCell key={`cell_${inc}`}>
                                                    <div>
                                                        {
                                                            // If in the value column, add the currency label to it.
                                                            (inc === 3) ? `${tableData} ${this.getCurrency(data.country)}` : `${tableData}`
                                                        }
                                                    </div>
                                                </TableCell>)}

                                        </TableRow>)
                            }
                            {
                                // If there are rows that aren't filled, fill it with an empty row
                                this.getEmptyRows() > 0 && (
                                    <TableRow style={{ height: 48 * this.getEmptyRows() }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 15, 20, 25]}
                                    colSpan={6}
                                    count={this.state.data.length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={this.getFooter}

                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </CardContent>
            </Card>
        );
    }
    /**
     * Creates the actions footer for the table
     */
    getFooter() {
        return (
            <FooterActions
                page={this.state.page}
                pageChange={this.handleChangePage}
                count={this.state.data.length}
                rowsPerPage={this.state.rowsPerPage}
            />
        )
    }

    /**
     *  Retrieves the number of rows that cannot be filled
     */
    getEmptyRows() {
        let emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage,
            this.state.data.length - this.state.page * this.state.rowsPerPage);
        return emptyRows;
    }

    /**
     * Handles the switching on pages
     */
    handleChangePage(pageNo) {
        this.setState({
            page: pageNo
        })
    }

    /**
     * Handles the rows changing
     */
    handleChangeRowsPerPage(event) {
        this.setState({
            rowsPerPage: parseInt(event.target.value)
        })
    }

    // Makes a completely different reference of the same object
    makeCopy() {
        if (this.state.data.length !== 0) {
            let data = [...this.state.data]
            let copy = data.map((x, i) => x = JSON.parse(JSON.stringify(x)))
            this.setState({
                originalData: copy
            })
        }
    }

    /**
     * This function grabs the headings from json after it has loaded.
     */
    createHeadings() {
        let headings = this.state.originalData.length === 0 ? ["loading..."] : Object.keys(this.state.originalData[0]);
        // I wanted to capitalise the headings because it looks nicer
        let capitalisedHeadings = headings.map(heading => this.capitaliseFirstLetter(heading))
        return capitalisedHeadings;
    }

    /**
     * Capitalised the first letter of a string
     */
    capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    /**
     * Sorts the data which depends on the column
     */
    handleSortClick(sortBy) {
        this.setState({
            sort: (this.state.sort === 'asc') ? 'desc' : 'asc'
        })
        this.state.data.sort((x, y) => (typeof x[sortBy.toLowerCase()] === 'string') ?
            `${x[sortBy.toLowerCase()]}`.localeCompare(`${y[sortBy.toLowerCase()]}`)
            : x[sortBy.toLowerCase()] - y[sortBy.toLowerCase()])
        if (this.state.sort === 'desc') {
            this.state.data.reverse()
        }
    }

    /**
     * This function grabs the data from the json after it has loaded.
     */
    getData() {
        let data;
        if (this.state.originalData.length === 0) {
            data = ["Nothing found"];
        } else {
            if (this.state.data.length === 0) {
                data = Object.values(this.state.originalData);
            } else {
                data = Object.values(this.state.data);
            }
        }
        return data;
    }

    /**
     * This function allows currency to be shown
     */
    getCurrency(country) {
        switch (this.state.currency) {
            case "All":
                switch (country) {
                    case "USA":
                        return "USD";
                    case "NZL":
                        return "NZD";
                    case "AUS":
                        return "AUD";
                    default:
                        return "";
                }
            default:
                return this.state.currency;
        }

    }


    /**
     * Displays the filter menu when clicked
     */
    handleOptionsClick(event) {
        this.setState({
            anchor: event.currentTarget,
            isOpen: true
        })
    }

    /**
     * Closes the menu 
     */
    handleMenuClose() {
        this.setState({
            isOpen: false,
        })
    }

    /**
     * Updates the text field
     */
    handleFieldChange(value) {
        this.setState({
            text: value
        })
    }

    /**
     * Determines to show the menu
     */
    handleReturnedOption() {
        this.setState({
            showReturn: !this.state.showReturn
        })
    }

    /**
     * Handles the current currency setting
     */
    handleCurrency(value) {
        this.setState({
            currency: value
        })
    }
    /**
     * Updates the table depending on the data made by the filter menu
     */
    handleTableUpdate(newData) {
        this.setState({
            data: newData
        })
    }

}

export default SalesTable;