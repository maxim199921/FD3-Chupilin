import React from 'react';
import PropTypes from 'prop-types';

import './IshopTable.css';

import IshopItem from './IshopItem';
import IshopForm from './IshopForm';
import IshopNewForm from './IshopNewForm';

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
        selectedIshopList: [],
        workMode: null,//null- начальный режим, 1- режим просмотра, 2 - режим редактирования, 3 - режим добавления товара
    };

    delete = (code) => {
        if (confirm('Вы уверены?')) {
            let filterIshopList = this.state.ishopList.filter((item) => {
                    return item.code !== code;
                }
            );
            this.setState({ishopList: filterIshopList, workMode: null});
        }
    };

    filterFunc = (arr, key) => {
        return arr.filter((item) => {
            return item.code === key;
        })
    };

    changeBackgroundItem = (evt, key) => {
        let filterlist = this.filterFunc(this.state.ishopList, key);
        this.setState({selectedIshopList: filterlist, workMode: 1, selectedCode: key});
    };

    edit = (evt, key) => {
        let filterlist = this.filterFunc(this.state.ishopList, key);
        this.setState({selectedIshopList: filterlist, workMode: 2, selectedCode: key});
    };

    newProduct = () => {
        this.setState({selectedCode: 0, workMode: 3});
    };

    saveEdit = (evt, arr) => {
        this.setState({ishopList: arr, selectedCode: 0, workMode: null});
    };

    initWorkMode = (evt) => {
        this.setState({selectedCode: 0, workMode: null});
    };

    render() {
        let ishopListResult = this.state.ishopList.map((item) =>
            <IshopItem key={item.code}
                       code={item.code} name={item.name}
                       price={item.price} url={item.url}
                       quantity={item.quantity} selectedCode={this.state.selectedCode}
                       workmode={this.state.workMode}
                       cbdelete={this.delete} cbchangeBackgroundItem={this.changeBackgroundItem}
                       cbedit={this.edit}/>
        );
        let viewItem = this.state.selectedIshopList.map((item) => {
            return <div key={this.state.selectedCode}>
                <div>name: {item.name}</div>
                <div>price: {item.price}</div>
                <div>quantity: {item.quantity}</div>
            </div>
        });
        let editItem = this.state.selectedIshopList.map((item) =>
            <IshopForm key={item.code}
                       code={item.code} name={item.name}
                       price={item.price} url={item.url}
                       quantity={item.quantity} selectedCode={this.state.selectedCode}
                       ishopList={this.state.ishopList} workmode={this.state.workMode}
                       cbsaveEdit={this.saveEdit} cbinitWorkMode={this.initWorkMode}/>
        );
        return (
            <div className='ishopTable'>
                <div className='nameShop'>{this.props.name}</div>
                <div className='ishoplist'>{ishopListResult}</div>
                <div className='newproductdiv'>
                    <button className='newproduct' onClick={this.state.workMode !== 2
                        ? this.newProduct
                        : null}>new product
                    </button>
                </div>
                {
                    (this.state.workMode === 1) &&
                    <div className='itemshopselected'>{viewItem}</div>
                }
                {
                    (this.state.workMode === 2) &&
                    <div className='itemshopselected'>{editItem}</div>
                }
                {
                    (this.state.workMode === 3) &&
                    <div className='itemshopselected'><IshopNewForm ishopList={this.state.ishopList}
                                                                    cbsaveEdit={this.saveEdit}
                                                                    cbinitWorkMode={this.initWorkMode}/></div>
                }
            </div>
        )
    };
}

export default IshopTable;