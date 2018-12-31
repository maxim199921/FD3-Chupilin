import React from 'react';
import PropTypes from 'prop-types';

import './IshopItem.css';

class IshopItem extends React.Component {

    static propTypes = {
        code: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        selectedCode: PropTypes.number,
        cbdelete: PropTypes.func.isRequired,
        cbchangeBackgroundItem: PropTypes.func.isRequired,
    };

    changeBackgroundItem = (evt) => {
        this.props.cbchangeBackgroundItem(evt, this.props.code);
    };

    delete = (evt) => {
        evt.stopPropagation();
        this.props.cbdelete(this.props.code);
    };

    render() {
        return  (
            <div key={this.props.code}
                 className={this.props.code === this.props.selectedCode
                     ? 'tableItem changecolor'
                     : 'tableItem'}
                 onClick={this.changeBackgroundItem}>
                <span className='nameItem'>{this.props.name}</span>
                <span className='price'>{this.props.price}</span>
                <span className='url'>{this.props.url}</span>
                <span className='quantity'>{this.props.quantity}</span>
                <button className='delete' onClick={this.delete}>delete</button>
            </div>
        )
    };
}

export default IshopItem;