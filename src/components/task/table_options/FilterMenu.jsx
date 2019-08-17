import React from 'react';
import {
    Menu,
    MenuItem,
    Checkbox,
    Typography
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
            checked: false,
        }
        this.handleReturnedCheckChange = this.handleReturnedCheckChange.bind(this);
    }

    render() {
        return (
            <Menu
                id="long-menu"
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
                    <Typography>Show returned only.</Typography>
                </MenuItem>
                <MenuItem id="returned-menu-item" onClick={this.handleReturnedCheckChange}  >
                </MenuItem>
            </Menu>
        )
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
            newData = this.props.data;
        }

        if (this.props.text.length > 0) {
            newData = newData.filter(x =>Object.values(x).map(y => y.toString().toLowerCase()).includes(this.props.text));
        }
        this.props.updateData(newData);
    }
}

export default FilterMenu;