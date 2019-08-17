import React from "react";
import {
    Card, CardContent, Typography,
    Table, TableCell, TableBody, TableHead, TableRow,
} from "@material-ui/core";

// Shows exchange rates in a table
const ExchangeRateCard = (props) => (
    <Card>
        <CardContent>
            <Typography>  Exchange Rates </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Base</TableCell>
                        {
                            Object.keys(props.rates).map(currency => <TableCell key={`exchangeCurrency_${currency}`}>
                                {currency}</TableCell>)
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                    <TableCell>{props.base}</TableCell>
                    {
                        Object.values(props.rates).map((rate, i) => <TableCell key={`exchangeRate_${i}`}>
                            {rate}
                            </TableCell>)
                    }
                    </TableRow>
                </TableBody>
            </Table>
            <Typography> <em> Note: This means that 1NZD = 0.95AUD </em> </Typography>
        </CardContent>
    </Card>
);

export default ExchangeRateCard;
