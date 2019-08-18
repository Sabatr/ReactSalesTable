import React from "react";
import {
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableHead,
    IconButton,
    Card, CardContent, Typography, TableSortLabel
} from "@material-ui/core";
import FilterMenu from './table_options/FilterMenu'

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
            currency: "All"
        }
        this.handleOptionsClick = this.handleOptionsClick.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleTableUpdate = this.handleTableUpdate.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleReturnedOption = this.handleReturnedOption.bind(this);
        this.makeCopy = this.makeCopy.bind(this);
        this.handleCurrency = this.handleCurrency.bind(this);
        this.handleSortClick = this.handleSortClick.bind(this);
    }



    componentDidMount() {
        fetch("http://www.mocky.io/v2/5d4caeb23100000a02a95477")
            .then(response => response.json())
            .then(response => this.setState({data:response }))
            .then(this.makeCopy);
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <Typography></Typography>
                    <IconButton
                        aria-label="more"
                        aria-haspopup="true"
                        onClick={this.handleOptionsClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <SearchField 
                        data={this.state.data} 
                        originalData={this.state.originalData} 
                        updateTable={this.handleTableUpdate}
                        handleChange={this.handleFieldChange}
                        text={this.state.text}
                        showReturned={this.state.showReturn}/>
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

                    />
                    <Table>
                        <TableHead>
                            <TableRow>
                                {this.createHeadings().map((value, i) =>
                                    <TableCell key={`heading_${i}`}>
                                        <TableSortLabel
                                            direction={this.state.sort}
                                            onClick={() => this.handleSortClick(value)}
                                        >
                                        { value }
                                        </TableSortLabel>
                                    </TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.getData().map((data, i) =>
                                    <TableRow key={`row_${i}`}>
                                        {Object.values(data).map((tableData, inc) =>
                                            <TableCell key={`cell_${inc}`}>
                                                <div>
                                                {
                                                    (inc === 3) ? `${tableData} ${this.getCurrency(data.country)}`: `${tableData}`}
                                                </div>
                                            </TableCell>)}
                                    </TableRow>)
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        );
    }

    makeCopy() {
        
        if ( this.state.data.length !== 0) {
            let data = [...this.state.data]
            let copy = data.map((x,i) => x = JSON.parse(JSON.stringify(x)))
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

    handleSortClick(sortBy) {
        this.setState({
            sort: (this.state.sort === 'asc') ? 'desc' : 'asc'
        })
        this.state.data.sort((x,y) => (typeof x[sortBy.toLowerCase()] === 'string') ?
                `${x[sortBy.toLowerCase()]}`.localeCompare(`${y[sortBy.toLowerCase()]}`)
            :     x[sortBy.toLowerCase()] - y[sortBy.toLowerCase()])
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

    getCurrency(country) {
        switch (this.state.currency) {
            case "All":
                switch(country) {
                    case "USA":
                        return "USD";
                    case "NZL":
                        return "NZD";
                    case "AUS":
                        return "AUD";
                    default:
                        return "";
                }
            case "USD":
                return "USD";
            case "NZD":
                return "NZD";
            case "AUD":
                return "AUD";
            default:
                return "";
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

    handleFieldChange(value) {
        this.setState({
            text: value
        })
    }

    handleReturnedOption() {
        this.setState({
            showReturn: !this.state.showReturn
        })
    }

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