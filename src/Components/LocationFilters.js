import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Select from 'react-select';

const mapStateToProps = (state) => {
    const options = state.location_type;
    return { options };
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterSelection:  (option) => {
            dispatch({
                type: option,
            })
        }
    };
}



class LocationFilters extends Component {
    static propTypes = {
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        filterSelection: PropTypes.func.isRequired,
    }
    state = {
        selectedOption: null
    }

    changeFilter = (option) => {
        this.props.filterSelection(option.value);
        this.setState({selectedOption: option});
    } // end of changeFilter

    resetFilters = (option) => {
        this.props.filterSelection(option);
        this.setState({selectedOption: null});
    } // end of resetFilters

    render() {
        const { options } = this.props;
        return (
            <div className='filters-container' id="filters-container">
                <button id='show-locations'  className="locations" onClick={() => this.resetFilters("SHOW-ALL")}>Show All Locations</button>
                <button id='hide-locations'  className="locations" onClick={() => this.resetFilters("HIDE-ALL")}>Hide All Locations</button>
                <Select
                    className="location-selector"
                    value={this.state.selectedOption}
                    onChange = {(option) => this.changeFilter(option)}
                    options={options}
                    placeholder="Filter Locations"
                />
                <hr />
            </div>
        );
    }
} // end of LocationFilters class

export default connect(mapStateToProps, mapDispatchToProps)(LocationFilters);
