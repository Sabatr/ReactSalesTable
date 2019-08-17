import React from "react"
import { TextField } from "../../../node_modules/@material-ui/core";

class SearchField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return (
            <TextField onChange={this.handleChange} onKeyDown={this.handleSubmit}/>
        );
    }

    handleChange(event) {
        this.props.handleChange(event.target.value);
    }

    handleSubmit(event) {
        if(event.keyCode === 13) {
            let value = this.props.text.toLowerCase();
            let newData = this.props.originalData;
            let filter = newData.filter(x =>Object.values(x).map(y => y.toString().toLowerCase()).includes(value));
            let filteredData =  (value.length === 0 || filter.length === 0) ? newData : filter; 
            if (this.props.showReturned) {
               filteredData =  filteredData.filter(x => x.returned === false)
            }
            this.props.updateTable(filteredData);
        }
    }
}

export default SearchField;