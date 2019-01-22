import React from 'react';
import PropTypes from 'prop-types';

import {mobileEvents} from './events';

import './MobileClient.css';

class MobileClient extends React.PureComponent {

    static propTypes = {
        info: PropTypes.shape({
            id: PropTypes.number.isRequired,
            f: PropTypes.string.isRequired,
            i: PropTypes.string.isRequired,
            o: PropTypes.string.isRequired,
            balance: PropTypes.any,
        }),
    };

    state = {
        info: this.props.info,
    };

    deleteItem = () => {
        mobileEvents.emit('evtDeleteItem', this.props.info.id);
    };

    editItem = () => {
        mobileEvents.emit('evtEditItem', this.props.info.id);
    };

    render() {
        console.log("MobileClient id=" + this.props.info.id + " render");
        return (
            <tr className='mobileClient'>
                <td>{this.props.info.f}</td>
                <td>{this.props.info.i}</td>
                <td>{this.props.info.o}</td>
                <td>{this.props.info.balance}</td>
                {(this.props.info.balance >= 0) ? <td className='active'>active</td> :
                    <td className='blocked'>blocked</td>}
                <td><input type='submit' value='редактировать' onClick={this.editItem}/></td>
                <td><input type='submit' value='удалить' onClick={this.deleteItem}/></td>
            </tr>
        );
    }
}

export default MobileClient;
