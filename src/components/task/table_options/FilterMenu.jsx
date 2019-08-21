import React from 'react';
import {
    Menu,
    MenuItem,
    Checkbox,
    Typography,
    Select
} from "@material-ui/core";

/**
 * A component for displaying the options menu for the table
 * 
 * @author Brian Nguyen
 */
class FilterMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: "All"
        }
        this.handleReturnedCheckChange = this.handleReturnedCheckChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.applyConversion = this.applyConversion.bind(this);
    }

    render() {
        return (
            <Menu
                anchorEl={this.props.anchor}
                keepMounted={true}
                open={this.props.isOpen}
                onClose={this.props.onClose}
                PaperProps={{
                    style: {
                        maxHeight: 400,
                        width: 400,
                    },
                }}
            >
                <MenuItem id="returned-menu-item" onClick={this.handleReturnedCheckChange}  >
                    <Checkbox checked={this.props.checked} />
                    <Typography>Show not returned only.</Typography>
                </MenuItem>
                <MenuItem>
                    <Select
                        native={true}
                        value={this.props.currency}
                        onChange={this.handleSelectChange}
                        style={{width: '100%'}}
                    >
                        <option>All</option>
                        <option>NZD</option>
                        {Object.keys(this.props.rates).map((x, i) => <option key={`Option_${i}`}>{x}</option>)}
                    </Select>
                </MenuItem>
            </Menu>
        )
    }

    handleSelectChange(event) {
        this.props.currencyHandler(event.target.value);
        let copy = this.makeCopy(this.props.data)
        copy.forEach((x, i) => x.value = this.applyConversion(event.target.value, x))
        this.props.updateData(copy);
    }

    /**
     * Applies the currency conversion rate
     * Currently it isn't very extendible as the switch case statement
     * can get pretty hefty after more currencies.
     * @param {*} currency 
     * @param {*} data 
     */
    applyConversion(currency, data) {
        let currencies = Object.keys(this.props.rates);
        currencies.push("All", "NZD");
        let convert = 1;
        let original = this.props.originalData.find(x => x.id === data.id).value;
        let country = data.country;
        switch (currency) {
            case "AUD":
                if (country === "NZL") {
                    convert = 1 / this.props.rates.AUD;
                } else if (country === "USA") {
                    convert = this.props.rates.USD / this.props.rates.AUD;
                }
                break;
            case "USD":
                if (country === "NZL") {
                    convert = 1 / this.props.rates.USD;
                } else if (country === "AUS") {
                    convert = this.props.rates.AUD / this.props.rates.USA;
                }
                break;
            case "NZD":
                if (country === "AUS") {
                    convert = this.props.rates.AUD;
                } else if (country === "USA") {
                    convert = this.props.rates.USD;
                }
                break;
            default:
                break;
        }
        let returnedValue = (convert === 1) ?  original : Math.round(original/convert * 100)/100;
        return returnedValue;
    }


    /**
     * Changes the data to be inputted, depending on the check
     */
    handleReturnedCheckChange() {
        this.props.handleReturned();
        let newData;
        if (!this.props.checked) {
            newData = this.props.data.filter(x => x.returned === false);
        } else {
            newData = this.makeCopy(this.props.originalData);
        }

        if (this.props.text.length > 0) {
            newData = newData.filter(x => Object.values(x).map(y => y.toString().toLowerCase()).includes(this.props.text));
        }
        this.props.changePage(0);
        this.props.updateData(newData);
    }

    /**
     * Makes a complete copy of an array but with a different reference.
     */
    makeCopy(array) {
        let copy = [...array]
        let copyInside = copy.map((x, i) => x = JSON.parse(JSON.stringify(x)))
        return copyInside
    }
}

export default FilterMenu;