import React from 'react';
import PropTypes from 'prop-types';

import './BasketList.css';
import {connect} from 'react-redux';
import {activeStatusSwitch, cntChange, cntStartValue} from '../../../redux/ActionCreaters/CatalogActions'

class BasketList extends React.PureComponent {

    static propTypes = {
        info: PropTypes.shape({
            id: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
            model: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            status: PropTypes.bool.isRequired,
            cnt: PropTypes.number.isRequired,
        }),
    };

    cntPlus = () => {
        this.props.dispatch( cntChange(this.props.info.id, +1) );
    };

    cntMinus = () => {
        if (this.props.info.cnt >= 2) {
            this.props.dispatch( cntChange(this.props.info.id, -1) );
        }
    };

    deleteItemFromBasket = () => {
        let changeStatusStartList = JSON.parse(localStorage.startPriceList);
        changeStatusStartList[this.props.info.id -1].status = false;
        localStorage['startPriceList'] = JSON.stringify(changeStatusStartList);
        this.props.dispatch( activeStatusSwitch(this.props.info.id, false) );
        this.props.dispatch( cntStartValue(this.props.info.id, 1) );
    };


    render() {

        return (
            <div className="col-12 BasketList">
                <div className="row">
                    <div className="col-12 col-lg-2 BasketList-img-wrapper">
                        <img className="BasketList-img" src={this.props.info.img}/>
                    </div>
                    <div className="col-12 col-lg-8 BasketList-info align-self-center">
                        <div className="row">
                            <div className="col-lg-12 BasketList-model">{this.props.info.model}</div>
                            <div className="col-lg-12 BasketList-description">{this.props.info.description}</div>
                            <div className="BasketList-count">
                                <span className="BasketList-count-minus" onClick={this.cntMinus}>-</span>
                                <input type="text" className="BasketList-count-inp" value={this.props.info.cnt} disabled={true}/>
                                <span className="BasketList-count-plus" onClick={this.cntPlus}>+</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-lg-1 BasketList-price align-self-center">{parseInt(this.props.info.price)*this.props.info.cnt}$</div>
                    <div className="col-6 col-lg-1 align-self-center">
                        <input type="button" className="btn btn-info btn-primary-add" value="delete"
                             onClick={this.deleteItemFromBasket}/>
                    </div>
                </div>
            </div>
        );

    }

}

const mapStateToProps = function (state) {
    return {};
};


export default connect(mapStateToProps)(BasketList);