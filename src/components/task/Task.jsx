import React, { Component } from "react";
import {Card, CardContent, Typography} from "@material-ui/core";

import ExchangeRateCard from "./ExchangeRateCard";
import SalesTable from "./SalesTable";


// import data from "../../data";

// Use the following url to access the data for all stores
// http://www.mocky.io/v2/5d4caeb23100000a02a95477
// If you have trouble with this, you can access the data through the uncommenting import "data" file above
// console.log(data);

class Task extends Component {
    state = {
        base: null,
        rates: {
            USD: null,
            AUD: null,
        },
        data: null
    };

    componentDidMount() {
        // fetch API to get base exchange rates for USD  / NZD / AUS
        fetch("http://www.mocky.io/v2/5d4cb480310000c503a95480")
            .then(response => response.json())
            .then(response => this.setState({ ...response }));
    }

    render() {
        return(
            <div>
                <Card>
                    <CardContent>
                        <Typography>
                            <b>Fetch the following URL to access the data: </b>
                        </Typography>

                        <Typography>
                        <i>http://www.mocky.io/v2/5d4caeb23100000a02a95477</i>
                        </Typography>

                        <Typography>
                            If you have trouble with doing this, you can access the data through by importing the "data".
                        </Typography>

                        <Typography>
                            A table with the exchange rates and an example table with some random data has been provided.
                            Replace the example table with your solution below.
                        </Typography>
                    </CardContent>
                </Card>
               
                <ExchangeRateCard rates={this.state.rates} base={this.state.base} />
                { /* Replace this example table with your solution below. */}
                <SalesTable rates={this.state.rates}/>
            </div>
        );
    }
};

export default Task;

