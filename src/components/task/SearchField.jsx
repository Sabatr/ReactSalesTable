import React from "react"
import { TextField, Tooltip, InputAdornment, IconButton } from "../../../node_modules/@material-ui/core";
import Filter from "@material-ui/icons/Search"
import Close from "@material-ui/icons/Close"

/**
 * The filtering/searching functionality of the app
 * 
 * @author Brian Nguyen
 */
class SearchField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRemoveText = this.handleRemoveText.bind(this);
    }
    render() {
        return (
            <TextField
            error={this.state.error} 
            onChange={this.handleChange} 
            onKeyDown={this.handleSubmit}
            style={{maxWidth: '200px'}}
            value={this.props.text}
            label="Search"
            placeholder="NewEgg"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Tooltip title="Search">
                            <Filter/>
                        </Tooltip>
                    </InputAdornment>
                ),
                endAdornment: (
                    (this.props.text === "" ) ? "":
                    <IconButton 
                        size="small"
                        onClick={this.handleRemoveText}>
                        <Close/>
                    </IconButton>
                )
            }}
            />
        );
    }

    /**
     * Removes the text within the textfield
     */
    handleRemoveText() {
        this.props.handleChange("");
    }

    /**
     * Updates the text to the parent component
     */
    handleChange(event) {
        this.props.handleChange(event.target.value);
    }

    /**
     * When the user presses enter, the filtering will begin.
     */
    handleSubmit(event) {
        if(event.keyCode === 13) {
            let value = this.props.text.toLowerCase();
            let newData = this.props.originalData;
            let filter = newData.filter(x =>Object.values(x).map(y => y.toString().toLowerCase()).includes(value));

            // If the filter does not apply, then show an error
            if (filter.length === 0 && value !== "") {
                this.setState({
                    error: true
                })
            } else {
                this.setState({
                    error: false
                })
                let filteredData =  (value.length === 0 || filter.length === 0) ? newData : filter; 

                // Also apply the returned option if necessary
                if (this.props.showReturned) {
                   filteredData =  filteredData.filter(x => x.returned === false);
                }
                this.props.changePage(0);
                this.props.updateTable(filteredData);
            }
        }
    }
}

export default SearchField;