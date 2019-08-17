import React from "react";
import {
    Table,
    TableCell,
    TableRow,
    TableBody,
    TableHead,

    Card, CardContent, Typography
} from "@material-ui/core";

// some random example data of number of cats and dogs seen on each day
const exampleData = [
    {
        date: "01/04/2019",
        cats: 4,
        dogs: 5,
    },
    {
        date: "01/05/2019",
        cats: 10,
        dogs: 2,
    },
    {
        date: "01/06/2019",
        cats: 7,
        dogs: 6,
    },
];

// get table headings
const tableHeadings = Object.keys(exampleData[0]);

const ExampleTable = () => (
    <Card>
        <CardContent>
            <Typography>Example Table (how many cats and dogs we saw each day)</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                {tableHeadings.map((key, i) => <TableCell key={`heading_${i}`}>{key}</TableCell>)}
                    </TableRow>
                </TableHead>

                <TableBody>
                {
                    exampleData.map((data, ind) => <TableRow key={`exampleRow_${ind}`}>
                        {Object.values(data).map((d, i) => <TableCell key={`exampleCell_${i}`}>{d}</TableCell>)}
                        </TableRow>)
                }
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

export default ExampleTable;
