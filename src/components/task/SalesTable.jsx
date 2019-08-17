import React from "react";
import {
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableHead,

    Card, CardContent, Typography
} from "@material-ui/core";

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
    state = {
        data: []
    }

    componentDidMount() {
        fetch("http://www.mocky.io/v2/5d4caeb23100000a02a95477")
        .then(response => response.json())
        .then(response => this.setState({ data : response }));
    }

    render() {
        return (
            <Card>
            <CardContent>
                <Typography></Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            {this.createHeadings().map((value,i) => 
                                <TableCell key={`heading_${i}`}>
                                    <div>{value}</div>
                                </TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                    this.getData().map((data,i) =>
                        <TableRow key={`row_${i}`}>
                                {Object.values(data).map((tableData,inc) => 
                                <TableCell key={`cell_${inc}`}>
                                    <div>{`${tableData}`}</div>
                                </TableCell>)}
                        </TableRow>)
                    }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        );
    }

    /**
     * This function grabs the headings from json after it has loaded.
     */
    createHeadings() {
        let headings = this.state.data.length === 0 ? ["loading..."] : Object.keys(this.state.data[0]);
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
     * This function grabs the data from the json after it has loaded.
     */
    getData() {
        let data = this.state.data.length === 0 ? ["loading..."] : Object.values(this.state.data);
        return data;
    }
}

export default SalesTable;