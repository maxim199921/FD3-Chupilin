import React from 'react';
import PropTypes from 'prop-types';

import isoFetch from 'isomorphic-fetch';

import MobileClient from './MobileClient';
import MobileCard from './MobileCard';

import {mobileEvents} from './events';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

    static propTypes = {};

    state = {
        companyMode: 1, // начальное значение режим работы MTS - 1, VElcom - 2.
        workMode: null, // null - обычный режим, 1 - режим редактирования, 2 - режим добавления клиента
        statusMode: null, // active-1, blocked-2
        clientsMts: [                            {id: 1111, f: "Иванов", i: "Игорь", o: "Иванович", balance: 200},
            {id: 1112, f: "Сидоров", i: "Сергей", o: "Леонидович", balance: 250},
            {id: 1113, f: "Петров", i: "Павел", o: "Сергеевич", balance: -20},
            {id: 1114, f: "Павлов", i: "Генадий", o: "Григорьевич", balance: -220}],
        clientsVelcom: [                            {id: 1111, f: "Иванов", i: "Игорь", o: "Иванович", balance: 200},
            {id: 1112, f: "Сидоров", i: "Сергей", o: "Леонидович", balance: 250},
            {id: 1113, f: "Петров", i: "Павел", o: "Сергеевич", balance: -20},
            {id: 1114, f: "Павлов", i: "Генадий", o: "Григорьевич", balance: -220}],
        clientsChange: [
                            {id: 1111, f: "Иванов", i: "Игорь", o: "Иванович", balance: 200},
                            {id: 1112, f: "Сидоров", i: "Сергей", o: "Леонидович", balance: 250},
                            {id: 1113, f: "Петров", i: "Павел", o: "Сергеевич", balance: -20},
                            {id: 1114, f: "Павлов", i: "Генадий", o: "Григорьевич", balance: -220}
                        ],// начальное значение
        nameCompany: 'мтс',
        selectedIdItem: 0,
    };

    componentDidMount = () => {
        this.loadData();
        mobileEvents.addListener('evtDeleteItem', this.deleteItem);
        mobileEvents.addListener('evtEditItem', this.editItem);
        mobileEvents.addListener('evtInitWorkMode', this.ininWorkMode);
        mobileEvents.addListener('evtSaveNewItem', this.saveNewItem);
        mobileEvents.addListener('evtEditChangeItem', this.editChangeItem);
    };

    componentWillUnmount = () => {
        mobileEvents.removeListener('evtDeleteItem', this.deleteItem);
        mobileEvents.removeListener('evtEditItem', this.editItem);
        mobileEvents.removeListener('evtInitWorkMode', this.ininWorkMode);
        mobileEvents.removeListener('evtSaveNewItem', this.saveNewItem);
        mobileEvents.removeListener('evtEditChangeItem', this.editChangeItem);
    };

    // loadData = () => {
    //     let sp = new URLSearchParams();
    //     this.updatePassword = Math.random();
    //     sp.append('f', 'LOCKGET');
    //     sp.append('n', 'CHUPILIN_SHOP');
    //     sp.append('p', this.updatePassword);
    //     isoFetch("http://fe.it-academy.by/AjaxStringStorage2.php", {
    //         method: 'POST',
    //         headers: {
    //             "Accept": "application/json",
    //         },
    //         body: sp,
    //     })
    //         .then( (response) => { // response - HTTP-ответ
    //             if (!response.ok) {
    //                 let Err=new Error("fetch error " + response.status);
    //                 Err.userMessage="Ошибка связи";
    //                 throw Err; // дальше по цепочке пойдёт отвергнутый промис
    //             }
    //             else
    //                 return response.json(); // дальше по цепочке пойдёт промис с пришедшими по сети данными
    //         })
    //         .then( (data) => {
    //             try {
    //                 this.fetchSuccess(data, this.updatePassword); // передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
    //             }
    //             catch ( error ){
    //                 this.fetchError(error.message); // если что-то пошло не так - дальше по цепочке пойдёт отвергнутый промис
    //             }
    //         })
    //         .catch( (error) => {
    //             this.fetchError(error.userMessage||error.message);
    //         });
    // };
    // fetchSuccess = (callresult, updatePassword) => {
    //     if (callresult.error !== undefined){
    //     }
    //     else {
    //         let message = {
    //             "clientsMts" : [
    //                 {"id": 1111, "f": "Иванов", "i": "Игорь", "o": "Иванович", "balance": 200},
    //                 {"id": 1112, "f": "Сидоров", "i": "Сергей", "o": "Леонидович", "balance": 250},
    //                 {"id": 1113, "f": "Петров", "i": "Павел", "o": "Сергеевич", "balance": -20},
    //                 {"id": 1114, "f": "Павлов", "i": "Генадий", "o": "Григорьевич", "balance": -220}
    //             ],
    //             "clientsVelcom": [
    //                 {"id": 2221, "f": "Лермонтов", "i": "Зеноид", "o": "Викторорвич", "balance": -50},
    //                 {"id": 2222, "f": "Пушкин", "i": "Борис", "o": "Моисеевич", "balance": 23},
    //                 {"id": 2223, "f": "Ломоносов", "i": "Галина", "o": "Федоровна", "balance": 20},
    //                 {"id": 2224, "f": "Гуляндин", "i": "Игорь", "o": "Андреевич", "balance": -56}
    //             ]
    //         };
    //         let sp2 = new URLSearchParams();
    //         sp2.append('f', 'UPDATE');
    //         sp2.append('n', 'CHUPILIN_SHOP');
    //         sp2.append('v', JSON.stringify(message));
    //         sp2.append('p', updatePassword);
    //         isoFetch("http://fe.it-academy.by/AjaxStringStorage2.php", {
    //             method: 'POST',
    //             headers: {
    //                 "Accept": "application/json",
    //             },
    //             body: sp2,
    //         })
    //     }
    // };
    // fetchError = (errorMessage) => {
    //     console.error(showStr);
    // };

    loadData = () => {
        let sp = new URLSearchParams();
        sp.append('f', 'READ');
        sp.append('n', 'CHUPILIN_SHOP');
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
                    this.fetchSuccess(JSON.parse(data.result)); // передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
                }
                catch ( error ){
                    this.fetchError(error.message); // если что-то пошло не так - дальше по цепочке пойдёт отвергнутый промис
                }
            })
            .catch( (error) => {
                this.fetchError(error.userMessage||error.message);
            })
        ;

    };
    fetchError = (errorMessage) => {
        console.error(showStr);
    };
    fetchSuccess = (loadedData) => {
        this.setState({
            clientsMts: loadedData.clientsMts,
            clientsVelcom: loadedData.clientsVelcom,
            clientsChange: loadedData.clientsMts,
        });
    };


    deleteItem = (id) => {
        let filterClientsChange = this.deleteItemFilterFunc(this.state.clientsChange, id);
        this.setState({clientsChange: filterClientsChange, workMode: null});
        if (this.state.companyMode === 1) {
            let filterClientsChangeMts = this.deleteItemFilterFunc(this.state.clientsMts, id);
            this.setState({clientsMts: filterClientsChangeMts});
        } else {
            let filterClientsChangeVelcom = this.deleteItemFilterFunc(this.state.clientsVelcom, id);
            this.setState({clientsVelcom: filterClientsChangeVelcom});
        }
    };
    deleteItemFilterFunc = (filterList, id) => {
        let filterClientsChange = filterList.filter((item) => {
                return item.id !== id;
            }
        );
        return filterClientsChange;
    };


    editItem = (id) => {
        this.setState({workMode: 1, selectedIdItem: id});
    };

    ininWorkMode = () => {
        this.setState({workMode: null});
    };


    saveNewItem = (arr) => {
        let newArr = this.saveNewItemImmutable(this.state.clientsChange, arr);
        if (this.state.statusMode === 1 && arr.balance >= 0) {
            this.setState({clientsChange: newArr});
        } else if(this.state.statusMode === 2 && arr.balance < 0){
            this.setState({clientsChange: newArr});
        } else if(this.state.statusMode === null){
            this.setState({clientsChange: newArr});
        }
        if (this.state.companyMode === 1) {
            let newArrMts = this.saveNewItemImmutable(this.state.clientsMts, arr);
            this.setState({workMode: null, clientsMts: newArrMts});
        } else {
            let newArrVelcom = this.saveNewItemImmutable(this.state.clientsVelcom, arr);
            this.setState({workMode: null, clientsVelcom: newArrVelcom});
        }
    };
    saveNewItemImmutable = (arr, hash) => {
        let clientsChange = [...arr];
        let newArr = [...clientsChange, hash];
        return newArr;
    };


    editChangeItem = (hash, id) => {
        let newArr = this.editChangeItemImmutable(this.state.clientsChange, hash, id);
        if (this.state.statusMode === 1) {
            let filterNewArr = newArr.filter((item) => {
                    return item.balance >= 0;
                }
            );
            this.setState({clientsChange: filterNewArr});
        } else if(this.state.statusMode === 2){
            let filterNewArr = newArr.filter((item) => {
                    return item.balance < 0;
                }
            );
            this.setState({clientsChange: filterNewArr});
        } else if(this.state.statusMode === null){
            this.setState({clientsChange: newArr});
        }
        if (this.state.companyMode === 1) {
            let newArrMts = this.editChangeItemImmutable(this.state.clientsMts, hash, id);
            this.setState({workMode: null, clientsMts: newArrMts});
        } else {
            let newArrVelcom = this.editChangeItemImmutable(this.state.clientsVelcom, hash, id);
            this.setState({workMode: null, clientsVelcom: newArrVelcom});
        }
    };
    editChangeItemImmutable = (arr, hash, id) => {
        let newArr = [...arr];
        newArr.forEach((item, i) => {
            if(id === item.id) {
                let newHash = {...item};
                newHash = {...hash};
                newArr[i]=newHash;
            }
        });
        return newArr;
    };


    newItem = () => {
        this.setState({workMode: 2});
    };

    allStatus = () => {
        if (this.state.companyMode === 1) {
            this.setState({clientsChange: this.state.clientsMts, statusMode: null});
        } else {
            this.setState({clientsChange: this.state.clientsVelcom, statusMode: null});
        }
    };


    activeStatus = () => {
        if (this.state.companyMode === 1) {
            this.activeStatusFilter(this.state.clientsMts);
        } else {
            this.activeStatusFilter(this.state.clientsVelcom);
        }
    };
    activeStatusFilter = (filterList) => {
        let filterClients = filterList.filter((item) => {
                return item.balance >= 0;
            }
        );
        this.setState({clientsChange: filterClients, statusMode: 1});
    };


    blockedStatus = () => {
        if (this.state.companyMode === 1) {
            this.blockedStatusFilter(this.state.clientsMts);
        } else {
            this.blockedStatusFilter(this.state.clientsVelcom);
        }
    };
    blockedStatusFilter = (filterList) => {
        let filterClients = filterList.filter((item) => {
                return item.balance < 0;
            }
        );
        this.setState({clientsChange: filterClients, statusMode: 2});
    };


    mts = () => {
        this.setState({nameCompany: 'мтс', clientsChange: this.state.clientsMts, companyMode: 1});
    };

    velcom = () => {
        this.setState({nameCompany: 'велком', clientsChange: this.state.clientsVelcom, companyMode: 2});
    };


    render() {
        console.log("MobileCompany render");
        let clientsItemMts = this.state.clientsChange.map(client =>
            <MobileClient key={client.id}
                          info={client}/>
        );

        return (
            <div className='MobileCompany'>
                <div className='MobileCompanyStatusButton'>
                        <input type='submit' value='мтс' onClick={this.mts}
                               disabled={(this.state.workMode === 1 || this.state.workMode === 2) ? true : null}/>
                        <input type='submit' value='велком' onClick={this.velcom}
                               disabled={(this.state.workMode === 1 || this.state.workMode === 2) ? true : null}/>
                    <br/>
                    <span>Выбран: {this.state.nameCompany}</span>
                </div>
                <br/>
                <div className='MobileCompanyStatusButton'>
                    <input type='submit' value='все' onClick={this.allStatus}
                           disabled={(this.state.workMode === 1 || this.state.workMode === 2) ? true : null}/>
                    <input type='submit' value='активные' onClick={this.activeStatus}
                           disabled={(this.state.workMode === 1 || this.state.workMode === 2) ? true : null}/>
                    <input type='submit' value='заблокированные' onClick={this.blockedStatus}
                           disabled={(this.state.workMode === 1 || this.state.workMode === 2) ? true : null}/>
                </div>
                <table className='MobileCompanyTable'>
                    <tbody>
                    <tr className='MobileCompanyList'>
                        <td>Фамилия</td>
                        <td>Имя</td>
                        <td>Отчество</td>
                        <td>Баланс</td>
                        <td>Статус</td>
                        <td>Редактировать</td>
                        <td>Удалить</td>
                    </tr>
                    {clientsItemMts}
                    <tr>
                        <td colSpan="7">
                            <input type='submit' value='добавить клиента' onClick={this.newItem}
                                   hidden={(this.state.workMode === 1 || this.state.workMode === 2) ? true : null}/>
                        </td>
                    </tr>
                    {
                        (this.state.workMode === 1) &&
                        <MobileCard key={this.state.selectedIdItem}
                                    clientsChange={this.state.clientsChange}
                                    clientsCompany={this.state.companyMode === 1
                                        ?this.state.clientsMts
                                        :this.state.clientsVelcom}
                                    companyMode={this.state.companyMode}
                                    workMode={this.state.workMode}
                                    selectedIdItem={this.state.selectedIdItem}/>
                    }
                    {
                        (this.state.workMode === 2) &&
                        <MobileCard clientsChange={this.state.clientsChange}
                                    clientsCompany={this.state.companyMode === 1
                                        ?this.state.clientsMts
                                        :this.state.clientsVelcom}
                                    companyMode={this.state.companyMode}
                                    workMode={this.state.workMode}
                                    selectedIdItem={this.state.selectedIdItem}/>
                    }
                    </tbody>
                </table>
            </div>
        );

    }

}

export default MobileCompany;
