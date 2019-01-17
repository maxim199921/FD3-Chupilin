import React from 'react';
import PropTypes from 'prop-types';

import {mobileEvents} from './events';

import './MobileCard.css';

class MobileCard extends React.PureComponent {

    static propTypes = {
        clientsChange: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                f: PropTypes.string.isRequired,
                i: PropTypes.string.isRequired,
                o: PropTypes.string.isRequired,
                balance: PropTypes.any,
            })
        ),
        clientsCompany: PropTypes.any,
        companyMode: PropTypes.number.isRequired,
        workMode: PropTypes.number.isRequired,
        selectedIdItem: PropTypes.number.isRequired,
    };

    state = {
        clientsChange: this.props.clientsChange,
        clientsItem: this.props.clientsChange.filter((item) => {
            return item.id === this.props.selectedIdItem;
        }),
        newId: this.props.clientsCompany.length ? this.props.clientsCompany.reduce((previousValue, currentItem) => { // нахожу самый большой айди из всех хэшэй и прибалсяю 1, так получаю уникальный id для нового клиента
            return previousValue.id > currentItem.id ? previousValue : currentItem;
        }).id + 1 : 0,
    };

    initWorkMode = (evt) => {
        mobileEvents.emit('evtInitWorkMode', evt);
    };

    f = null;
    i = null;
    o = null;
    balance = null;
    fFunc = (ref) => {
        this.f = ref;
    };
    iFunc = (ref) => {
        this.i = ref;
    };
    oFunc = (ref) => {
        this.o = ref;
    };
    balanceFunc = (ref) => {
        this.balance = ref;
    };

    saveValue = () => {
        if ( this.f.value&&this.i.value&&this.o.value&&this.balance.value ) {
            let newItem = {
                id: this.state.newId,
                f: this.f.value,
                i: this.i.value,
                o: this.o.value,
                balance: this.balance.value
            };
            if(this.props.workMode === 1){
                newItem.id = this.props.selectedIdItem;
                mobileEvents.emit('evtEditChangeItem', newItem, this.props.selectedIdItem);
            }
            else {
                mobileEvents.emit('evtSaveNewItem', newItem);
            }
        } else {
            alert('Заполните пустые поля');
        }
    };

    render() {

        console.log("MobileCard render");
        return (
            (this.props.workMode === 1)
            ?   <tr>
                    <td colSpan={7}>
                        <table>
                            <tbody>
                            <tr>
                                <td colSpan={2}>Редактирование клиента</td>
                            </tr>
                            <tr>
                                <td>Id:</td>
                                <td>{this.props.selectedIdItem}</td>
                            </tr>
                            <tr>
                                <td>Фамилия:</td>
                                <td><input type='text' defaultValue={this.state.clientsItem[0].f} name='f' ref={this.fFunc}/></td>
                            </tr>
                            <tr>
                                <td>Имя:</td>
                                <td><input type='text' defaultValue={this.state.clientsItem[0].i} name='i' ref={this.iFunc}/></td>
                            </tr>
                            <tr>
                                <td>Отчество:</td>
                                <td><input type='text' defaultValue={this.state.clientsItem[0].o} name='o' ref={this.oFunc}/></td>
                            </tr>
                            <tr>
                                <td>Баланс:</td>
                                <td><input type='text' defaultValue={this.state.clientsItem[0].balance} name='balance' ref={this.balanceFunc}/></td>
                            </tr>
                            <tr>
                                <td>
                                    <input type='submit' value='Save' onClick={this.saveValue}/>
                                    <input type='submit' value='Cancel' onClick={this.initWorkMode}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            :   <tr>
                    <td colSpan={7}>
                        <table>
                            <tbody>
                            <tr>
                                <td colSpan={2}>Новый клиент</td>
                            </tr>
                            <tr>
                                <td>Id:</td>
                                <td>{this.state.newId}</td>
                            </tr>
                            <tr>
                                <td>Фамилия:</td>
                                <td><input type='text' name='f' ref={this.fFunc}/></td>
                            </tr>
                            <tr>
                                <td>Имя:</td>
                                <td><input type='text' name='i' ref={this.iFunc}/></td>
                            </tr>
                            <tr>
                                <td>Отчество:</td>
                                <td><input type='text' name='o' ref={this.oFunc}/></td>
                            </tr>
                            <tr>
                                <td>Баланс:</td>
                                <td><input type='text' name='balance' ref={this.balanceFunc}/></td>
                            </tr>
                            <tr>
                                <td>
                                    <input type='submit' value='Save' onClick={this.saveValue}/>
                                    <input type='submit' value='Cancel' onClick={this.initWorkMode}/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
        );
    }
}

export default MobileCard;