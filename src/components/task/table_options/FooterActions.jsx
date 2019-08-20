import React from 'react';
import LastPageIcon from '@material-ui/icons/LastPage';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

/**
 * Component for the footer region of the table
 * 
 * @author Brian Nguyen
 */
class FooterActions extends React.Component {
    constructor(props) {
        super(props)

        this.handleFirstPageButtonClick = this.handleFirstPageButtonClick.bind(this)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
        this.handleNextButtonClick = this.handleNextButtonClick.bind(this)
        this.handleLastPageButtonClick = this.handleLastPageButtonClick.bind(this)
    }

    render() {
        return (
            <div className="" style={{width: '50%'}}>
                <IconButton
                    onClick={this.handleFirstPageButtonClick}
                    disabled={this.props.page === 0}
                    aria-label="first page"
                >
                    <FirstPageIcon/>
                </IconButton>
                <IconButton onClick={this.handleBackButtonClick} disabled={this.props.page === 0} aria-label="previous page">
                    <KeyboardArrowLeft/>
                </IconButton>
                <IconButton
                    onClick={this.handleNextButtonClick}
                    disabled={this.props.page >= Math.ceil(this.props.count / this.props.rowsPerPage) - 1}
                    aria-label="next page"
                >
                 <KeyboardArrowRight />
                </IconButton>
                <IconButton
                    onClick={this.handleLastPageButtonClick}
                    disabled={this.props.page >= Math.ceil(this.props.count / this.props.rowsPerPage) - 1}
                    aria-label="last page"
                >
                 <LastPageIcon />
                </IconButton>
            </div>
        )
    }

    handleFirstPageButtonClick() {
        this.props.pageChange(0);
    }

    handleBackButtonClick() {
        this.props.pageChange(this.props.page-1);
    }

    handleNextButtonClick() {
        this.props.pageChange(this.props.page+1);
    }

    handleLastPageButtonClick() {
        this.props.pageChange( Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1));
    }
}

export default FooterActions;