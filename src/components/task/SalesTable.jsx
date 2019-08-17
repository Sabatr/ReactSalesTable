import React from "react";
import {
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableHead,

    Card, CardContent, Typography
} from "@material-ui/core";

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
      //  this.createHeadings();
        return (
            <Card>
            <CardContent>
                <Typography></Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            {this.createHeadings().map((value,i) => <TableCell key={`heading_${i}`}>{value}</TableCell>)}
                        </TableRow>
                    </TableHead>
    
                    <TableBody>
                    {/*
                        exampleData.map((data, ind) => <TableRow key={`exampleRow_${ind}`}>
                            {Object.values(data).map((d, i) => <TableCell key={`exampleCell_${i}`}>{d}</TableCell>)}
                            </TableRow>)
                    */}
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
        return headings;
    }
}

export default SalesTable;