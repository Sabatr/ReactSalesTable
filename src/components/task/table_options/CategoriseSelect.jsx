import React from 'react';
import {
    Menu,
    MenuItem,
    Checkbox,
    Typography,
    Select,
    TableCell,
    TableRow
} from "@material-ui/core";

class CategoriseSelect extends React.Component {
    constructor(props) {
        super(props);
        const stores = this.props.data;
        
        this.state = {
            id: [],
            index: [],
            country: ['USA','NZL','AUS'],
            valueRange: [{"small" : 300}],
            store: [],
            returned: [false, true]

        }

        console.log(stores)
        this.createOptionsDropdown = this.createOptionsDropdown.bind(this)
    }
    render() {
        return (
            <TableRow>
                <TableCell>

                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
                <Select
                native={true}
                value={this.props.currency}
                onChange={this.handleSelectChange}
                style={{ width: '100%' }}
            >
                {this.state.country.map((x,i) => this.createSelection(x,i))}
            </Select>

                </TableCell>
                <TableCell>
                <Select
                native={true}
                value={this.props.currency}
                onChange={this.handleSelectChange}
                style={{ width: '100%' }}
            >
            
            </Select>

                </TableCell>
                <TableCell>
                <Select
                native={true}
                value={this.props.currency}
                onChange={this.handleSelectChange}
                style={{ width: '100%' }}
            >
            </Select>

                </TableCell>
                <TableCell>
                <Select
                native={true}
                value={this.props.currency}
                onChange={this.handleSelectChange}
                style={{ width: '100%' }}
            >
                <option>one</option>
            </Select>

                </TableCell>
            </TableRow>
        )
    }

    checkForDuplicateIndex(x,i) {
        this.createSelection(x,i)
    }
    createSelection(x,i) {
        return (
            <option key={`selection_${x}_${i}`}>
            {x}
            </option>
        )
    }


    createOptionsDropdown(value) {
        this.setState({
            index: this.state.index.push(value)
        })
        
        return (
            <option>
                {value}
            </option>
        )
    }
}




export default CategoriseSelect;