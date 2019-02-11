import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import isoFetch from 'isomorphic-fetch';

import BasketList from './BasketList/BasketList';
import './BasketPage.css';
import {FETCH_DATA_FAILURE, FETCH_DATA_SUCCESS} from "../../redux/ActionCreaters/CatalogActions";


class BasketPage extends React.PureComponent {

    static propTypes = {
        startPriceList: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                type: PropTypes.string.isRequired,
                img: PropTypes.string.isRequired,
                model: PropTypes.string.isRequired,
                price: PropTypes.string.isRequired,
                description: PropTypes.string.isRequired,
                status: PropTypes.bool.isRequired,
                cnt: PropTypes.number.isRequired,
            })
        ),
    };

    state = {
        summProducts: 0,
        nameValue: null,
        phoneValue: null,
        successOrder: false,
    };

    componentDidMount = () => {
        if (localStorage.startPriceList !== undefined){
            this.props.dispatch( { type: FETCH_DATA_SUCCESS, priceList: JSON.parse(localStorage.startPriceList)} );
        }
        this.closeWindow();
    };

    closeWindow = () => {
                // $(window).on("beforeunload", function() {
                //     return "trololo?";
                // });
    };

    PushNewItemData = () => {
        let sp = new URLSearchParams();
        this.updatePassword = Math.random();
        sp.append('f', 'LOCKGET');
        sp.append('n', 'CHUPILIN_ORDER_ITEM');
        sp.append('p', this.updatePassword);
        isoFetch("http://fe.it-academy.by/AjaxStringStorage2.php", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
            },
            body: sp,
        })
            .then( (response) => { // response - HTTP-ответ
                if (!response.ok) {
                    let Err=new Error("fetch error " + response.status);
                    Err.userMessage="Ошибка связи";
                    throw Err; // дальше по цепочке пойдёт отвергнутый промис
                }
                else
                    return response.json(); // дальше по цепочке пойдёт промис с пришедшими по сети данными
            })
            .then( (data) => {
                try {
                    this.fetchSuccess(data, this.updatePassword); // передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
                }
                catch ( error ){
                    this.fetchError(error.message); // если что-то пошло не так - дальше по цепочке пойдёт отвергнутый промис
                }
            })
            .catch( (error) => {
                this.fetchError(error.userMessage||error.message);
            });
    };
    fetchSuccess = (callresult, updatePassword) => {
        if (callresult.error !== undefined){
        }
        else {
            let message = {
                name: this.state.nameValue,
                phone: this.state.phoneValue,
                order: this.props.startPriceList
            };
            let sp2 = new URLSearchParams();
            sp2.append('f', 'UPDATE');
            sp2.append('n', 'CHUPILIN_ORDER_ITEM');
            sp2.append('v', JSON.stringify(message));
            sp2.append('p', updatePassword);
            isoFetch("http://fe.it-academy.by/AjaxStringStorage2.php", {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                },
                body: sp2,
            })
                .then( (response) => { // response - HTTP-ответ
                    if (!response.ok) {
                        let Err=new Error("fetch error " + response.status);
                        Err.userMessage="Ошибка связи";
                        throw Err; // дальше по цепочке пойдёт отвергнутый промис
                    }
                    else
                        this.successOrder(); // дальше по цепочке пойдёт промис с пришедшими по сети данными
                })
        }
    };
    fetchError = (errorMessage) => {
        console.error(showStr);
    };
    successOrder = () => {
        $(window).on("click", () =>{
            location.reload()
        });
        localStorage.clear();
        this.setState({successOrder: true});
    };

    formNameGetValue = (evt) => {
        this.setState({nameValue: evt.target.value});
    };
    formPhoneGetValue = (evt) => {
        this.setState({phoneValue: evt.target.value});
    };



    summProducts = () => {
       let summProducts =  this.props.startPriceList.reduce((curr, prev) => {
           return curr + (prev.cnt * parseInt(prev.price));
       }, 0);
       this.setState({summProducts: summProducts});
    };

    render() {

        let basketList = this.props.startPriceList.map(item =>
                <BasketList key={item.id}
                            info={item}/>
        );

        return (
            (this.props.startPriceList.length) ?
            <div className="BasketPage">
                <div className="BasketPage-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 BasketPage-Text">
                                <h2 className="BasketPage-header">Basket</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {basketList}
                    </div>
                </div>
                <div className="container BasketPage-buttons">
                    <div className="row">
                        <div className="col-0 col-sm-3 col-md-4 col-lg-5"></div>
                        <div className="col-6 col-sm-3 col-md-2 col-lg-1 BasketPage-buttons-wrapper">
                            <NavLink to="/catalogpage" className="btn btn-primary">add</NavLink>
                        </div>
                        <div className="col-6 col-sm-3 col-md-2 col-lg-1 BasketPage-buttons-wrapper">
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm"
                                    onClick={this.summProducts}>buy</button>
                        </div>
                        <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false">
                            <div className="vertical-alignment-helper">
                                <div className="modal-dialog modal-sm vertical-align-center">
                                    <div className="modal-content">
                                        <div className="container">
                                            <div className="row">
                                                {
                                                    this.state.successOrder ?
                                                    <div className="col-12 success-order">
                                                        <h2 className="success-order-text">Your order is succes, Thank you</h2>
                                                        <div className="col-12">
                                                            <input type="button" className="btn btn-primary BasketPage-form-btn" defaultValue="ok"/>
                                                        </div>
                                                    </div>
                                                        :
                                                    <div className="col-12">
                                                        <div className="col-12">
                                                            <input type="text" className="BasketPage-form-name" placeholder="Please enter name"
                                                                   onChange={this.formNameGetValue}/>
                                                        </div>
                                                        <div className="col-12">
                                                            <input type="text" className="BasketPage-form-phone" placeholder="Please enter phone"
                                                                   onChange={this.formPhoneGetValue}/>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="BasketPage-form-price">Total: {this.state.summProducts}$</div>
                                                        </div>
                                                        <div className="col-12">
                                                            <input type="button" className="btn btn-primary BasketPage-form-btn" value="buy"
                                                                   onClick={this.PushNewItemData}
                                                                   disabled={!this.state.nameValue||!this.state.phoneValue ? true : null}/>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-0 col-sm-3 col-md-4 col-lg-5"></div>
                    </div>
                </div>
            </div>
            :
            <div className="BasketPage">
                <div className="BasketPage-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 BasketPage-Text">
                                <h2 className="BasketPage-header">Basket</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <h1 className="BasketPage-empty">Basket is empty please  add items</h1>
                        <NavLink to="/catalogpage" className="btn btn-primary BasketPage-empty-btn">add</NavLink>
                    </div>
                </div>
            </div>
        );

    }

}


const mapStateToProps = function (state) {
    return {
        startPriceList: state.catalogList.startPriceList.filter((item) => {
            return item.status === true;
        }),
    };
};


export default connect(mapStateToProps)(BasketPage);

