import React from 'react';
import PropTypes from 'prop-types';

import {ishopEvents} from './events';

import './IshopForm.css';

class IshopForm extends React.Component {

    static propTypes = {
        code: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.any.isRequired,
        url: PropTypes.string.isRequired,
        quantity: PropTypes.any.isRequired,
        selectedCode: PropTypes.number,
        ishopList: PropTypes.any,
        workmode: PropTypes.any,
    };

    state = {
        ishopList: this.props.ishopList,
        name: true,
        price: true,
        url: true,
        quantity: true
    };

    saveValue = (evt) => {
        let a = this.state.ishopList.slice();
        let arr = a.map((item) => {
            if (item.code === this.props.selectedCode) {
                switch (evt.target.name) {
                    case 'name':
                        if (!evt.target.value) {
                            this.setState({name: false});
                        }
                        else {
                            this.setState({name: true});
                            item.name = evt.target.value;
                        }
                        break;
                    case 'price':
                        if (!evt.target.value) {
                            this.setState({price: false});
                        }
                        else {
                            this.setState({price: true});
                            item.price = evt.target.value;
                        }
                        break;
                    case 'url':
                        if (!evt.target.value) {
                            this.setState({url: false});
                        }
                        else {
                            this.setState({url: true});
                            item.url = evt.target.value;
                        }
                        break;
                    case 'quantity':
                        if (!evt.target.value) {
                            this.setState({quantity: false});
                        }
                        else {
                            this.setState({quantity: true});
                            item.quantity = evt.target.value;
                        }
                        break;
                    default:
                        console.log(`error`);
                }
                return item;
            } else {
                return item;
            }
        });
        this.setState({ishopList: arr});
    };

    saveEdit = (evt) => {
        evt.preventDefault();
        ishopEvents.emit('evtSaveEdit', evt, this.state.ishopList);
    };

    initWorkMode = (evt) => {
        evt.preventDefault();
        // this.props.cbinitWorkMode(evt)
        ishopEvents.emit('evtInitWorkMode', evt);
    };

    render() {
        return  (
            <form key={this.props.selectedCode}>
                <table>
                    <tbody>
                    <tr>
                        <td className='textedititem'>Edit item</td>
                    </tr>
                    <tr>
                        <td>ID:{this.props.selectedCode}</td>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        <td><input type='text' defaultValue={this.props.name} name='name' onChange={this.saveValue}
                                   onBlur={this.saveValue}/></td>
                        {this.state.name === true ? null : <td>вы ввели пустое значение</td>}</tr>
                    <tr>
                        <td>Price:</td>
                        <td><input type='text' defaultValue={this.props.price} name='price' onChange={this.saveValue}
                                   onBlur={this.saveValue}/></td>
                        {this.state.price === true ? null : <td>вы ввели пустое значение</td>}</tr>
                    <tr>
                        <td>URL:</td>
                        <td><input type='text' defaultValue={this.props.url} name='url' onChange={this.saveValue}
                                   onBlur={this.saveValue}/></td>
                        {this.state.url === true ? null : <td>вы ввели пустое значение</td>}</tr>
                    <tr>
                        <td>Quantity:</td>
                        <td><input type='text' defaultValue={this.props.quantity} name='quantity' onChange={this.saveValue}
                                   onBlur={this.saveValue}/></td>
                        {this.state.quantity === true ? null : <td>вы ввели пустое значение</td>}</tr>
                    <tr>
                        <td>
                            <input type='submit' value='save' onClick={this.saveEdit}
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

export default IshopForm;