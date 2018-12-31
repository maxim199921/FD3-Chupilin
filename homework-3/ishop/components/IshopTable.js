import React from 'react';
import PropTypes from 'prop-types';

import './IshopTable.css';

import IshopItem from './IshopItem';

class IshopTable extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        ishopList: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                url: PropTypes.string.isRequired,
                quantity: PropTypes.number.isRequired,
            })
        )
    };

    state = {
        ishopList: this.props.ishopList,
        selectedCode: null,
    };

    delete = (code) => {
        if (confirm('Вы уверены?')) {
            this.setState({
                    ishopList: this.state.ishopList.filter((item) => {
                            return item.code !== code;
                        }
                    )
                }
            );
        }
    };

    changeBackgroundItem = (evt, key) => {
        this.setState({selectedCode: key});
    };

    render() {
        let ishopListResult = this.state.ishopList.map((item) =>
            <IshopItem key = {item.code}
            code = {item.code} name = {item.name}
            price = {item.price} url = {item.url}
            quantity={item.quantity} selectedCode={this.state.selectedCode}
            cbdelete={this.delete} cbchangeBackgroundItem={this.changeBackgroundItem} />
        );

        return  (
            <div className='ishopTable'>
                <div className='nameShop'>{this.props.name}</div>
                <div className='ishoplist'>{ishopListResult}</div>
            </div>
        )
    };
}

export default IshopTable;