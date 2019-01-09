import React from 'react';
import PropTypes from 'prop-types';

import './IshopNewForm.css';

class IshopNewForm extends React.Component {

    static propTypes = {
        ishopList: PropTypes.any,
        cbsaveEdit: PropTypes.func.isRequired,
        cbinitWorkMode: PropTypes.func.isRequired,
    };

    state = {
        ishopList: this.props.ishopList,
        newName:null,
        newPrice:null,
        newUrl:null,
        newQuantity:null,
        newCode: this.props.ishopList.length+1,
        name: false,
        price: false,
        url: false,
        quantity: false,
    };

    saveValue = (evt) => {
        switch (evt.target.name) {
            case 'name':
                if (!evt.target.value) {
                    this.setState({name: false});
                }
                else {
                    this.setState({name: true, newName: evt.target.value});
                }
                break;
            case 'price':
                if (!evt.target.value) {
                    this.setState({price: false});
                }
                else {
                    this.setState({price: true, newPrice: evt.target.value});
                }
                break;
            case 'url':
                if (!evt.target.value) {
                    this.setState({url: false});
                }
                else {
                    this.setState({url: true, newUrl: evt.target.value});
                }
                break;
            case 'quantity':
                if (!evt.target.value) {
                    this.setState({quantity: false});
                }
                else {
                    this.setState({quantity: true, newQuantity: evt.target.value});
                }
                break;
            default:
                console.log(`error`);
        }
    };

    newItemListAdd = (evt) => {
        evt.preventDefault();
        let newItem = {name: this.state.newName,
            price: this.state.newPrice,
            url: this.state.newUrl,
            quantity: this.state.newQuantity,
            code: this.state.newCode};
        this.state.ishopList.push(newItem);
        this.saveEdit(evt);
    };

    saveEdit = (evt) => {
        this.props.cbsaveEdit(evt, this.state.ishopList);
    };

    initWorkMode = (evt) => {
        evt.preventDefault();
        this.props.cbinitWorkMode(evt)
    };

    render() {
        return  (
            <form key={this.props.ishopList.length}>
                <table>
                    <tbody>
                    <tr>
                        <td className='textedititem'>ADD new Item</td>
                    </tr>
                    <tr>
                        <td>ID:{this.props.ishopList.length+1}</td>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        <td><input type='text' name='name' onChange={this.saveValue}
                                   onBlur={this.saveValue}/></td>
                        {this.state.name === true ? null : <td>вы ввели пустое значение</td>}</tr>
                    <tr>
                        <td>Price:</td>
                        <td><input type='text' name='price' onChange={this.saveValue}
                                   onBlur={this.saveValue}/></td>
                        {this.state.price === true ? null : <td>вы ввели пустое значение</td>}</tr>
                    <tr>
                        <td>URL:</td>
                        <td><input type='text' name='url' onChange={this.saveValue}
                                   onBlur={this.saveValue}/></td>
                        {this.state.url === true ? null : <td>вы ввели пустое значение</td>}</tr>
                    <tr>
                        <td>Quantity:</td>
                        <td><input type='text' name='quantity' onChange={this.saveValue}
                                   onBlur={this.saveValue}/></td>
                        {this.state.quantity === true ? null : <td>вы ввели пустое значение</td>}</tr>
                    <tr>
                        <td>
                            <input type='submit' value='add' onClick={this.newItemListAdd}
                                   disabled={!(this.state.name && this.state.price && this.state.url && this.state.quantity)}/>
                            <input type='submit' value='cancel' onClick={this.initWorkMode}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        )
    };
}

export default IshopNewForm;