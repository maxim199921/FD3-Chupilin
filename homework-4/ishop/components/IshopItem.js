import React from 'react';
import PropTypes from 'prop-types';

import './IshopItem.css';

class IshopItem extends React.Component {

    static propTypes = {
        code: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.any.isRequired,
        url: PropTypes.string.isRequired,
        quantity: PropTypes.any.isRequired,
        selectedCode: PropTypes.number,
        workmode: PropTypes.any,
        cbdelete: PropTypes.func.isRequired,
        cbchangeBackgroundItem: PropTypes.func.isRequired,
        cbedit: PropTypes.func.isRequired,
    };

    changeBackgroundItem = (evt) => {
        this.props.cbchangeBackgroundItem(evt, this.props.code);
    };

    delete = (evt) => {
        evt.stopPropagation();
        this.props.cbdelete(this.props.code);
    };

    edit = (evt) => {
        evt.stopPropagation();
        this.props.cbedit(evt, this.props.code);
    };

    render() {
        return  (
            <div key={this.props.code}
                 className={this.props.code === this.props.selectedCode
                     ? 'tableItem changecolor'
                     : 'tableItem'}
                 onClick={(this.props.workmode === 2||this.props.workmode === 3)
                     ? null
                     : this.changeBackgroundItem}>
                <span className='nameItem'>{this.props.name}</span>
                <span className='price'>{this.props.price}</span>
                <span className='url'>{this.props.url}</span>
                <span className='quantity'>{this.props.quantity}</span>
                <button className='edit' onClick={(this.props.workmode === 2||this.props.workmode === 3)
                    ? null
                    : this.edit}>edit</button>
                <button className='delete' onClick={(this.props.workmode === 2||this.props.workmode === 3)
                    ? null
                    :this.delete}>delete</button>
            </div>
        )
    };
}

export default IshopItem;