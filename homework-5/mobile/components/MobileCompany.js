import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';
import MobileCard from './MobileCard';

import {mobileEvents} from './events';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

    static propTypes = {
        clientsMts: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                f: PropTypes.string.isRequired,
                i: PropTypes.string.isRequired,
                o: PropTypes.string.isRequired,
                balance: PropTypes.number.isRequired,
            })
        ),
        clientsVelcom: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                f: PropTypes.string.isRequired,
                i: PropTypes.string.isRequired,
                o: PropTypes.string.isRequired,
                balance: PropTypes.number.isRequired,
            })
        ),
    };

    state = {
        companyMode: 1, // начальное значение режим работы MTS - 1, VElcom - 2.
        workMode: null, // null - обычный режим, 1 - режим редактирования, 2 - режим добавления клиента
        statusMode: null, // active-1, blocked-2
        clientsMts: this.props.clientsMts,
        clientsVelcom: this.props.clientsVelcom,
        clientsChange: this.props.clientsMts,// начальное значение
        nameCompany: 'мтс',
        selectedIdItem: 0,

    };

    componentDidMount = () => {
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

    deleteItem = (id) => {
        let filterClientsChange = this.state.clientsChange.filter((item) => {
                return item.id !== id;
            }
        );
        this.setState({clientsChange: filterClientsChange, workMode: null});
        if (this.state.companyMode === 1) {
            let filterClientsChange = this.state.clientsMts.filter((item) => {
                return item.id !== id;
            });
            this.setState({clientsMts: filterClientsChange});
        } else {
            let filterClientsChange = this.state.clientsVelcom.filter((item) => {
                return item.id !== id;
            });
            this.setState({clientsVelcom: filterClientsChange});
        }
    };

    editItem = (id) => {
        this.setState({workMode: 1, selectedIdItem: id});
    };

    ininWorkMode = () => {
        this.setState({workMode: null});
    };

    saveNewItem = (arr) => {
        let clientsChange = [...this.state.clientsChange];
        let newArr = [...clientsChange, arr];
        if (this.state.statusMode === 1 && arr.balance >= 0) {
            this.setState({clientsChange: newArr});
        } else if(this.state.statusMode === 2 && arr.balance < 0){
            this.setState({clientsChange: newArr});
        } else if(this.state.statusMode === null){
            this.setState({clientsChange: newArr});
        }
        if (this.state.companyMode === 1) {
            let clientsChange = [...this.state.clientsMts];
            let newArrMts = [...clientsChange, arr];
            this.setState({workMode: null, clientsMts: newArrMts});
        } else {
            let clientsChange = [...this.state.clientsVelcom];
            let newArrVelcom = [...clientsChange, arr];
            this.setState({workMode: null, clientsVelcom: newArrVelcom});
        }
    };


    editChangeItem = (hash, id) => {
       let newArr = [...this.state.clientsChange];
        newArr.forEach((item, i) => {
            if(id === item.id) {
                let newHash = {...item};
                newHash = {...hash};
                newArr[i]=newHash;
            }
        });
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
            let newArrMts = [...this.state.clientsMts];
            newArrMts.forEach((item, i) => {
                if(id === item.id) {
                    let newHash = {...item};
                    newHash = {...hash};
                    newArrMts[i]=newHash;
                }
            });
            this.setState({workMode: null, clientsMts: newArrMts});
        } else {
            let newArrVelcom = [...this.state.clientsVelcom];
            newArrVelcom.forEach((item, i) => {
                if(id === item.id) {
                    let newHash = {...item};
                    newHash = {...hash};
                    newArrVelcom[i]=newHash;
                }
            });
            this.setState({workMode: null, clientsVelcom: newArrVelcom});
        }
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
            let filterClients = this.state.clientsMts.filter((item) => {
                    return item.balance >= 0;
                }
            );
            this.setState({clientsChange: filterClients, statusMode: 1});
        } else {
            let filterClients = this.state.clientsVelcom.filter((item) => {
                    return item.balance >= 0;
                }
            );
            this.setState({clientsChange: filterClients, statusMode: 1});
        }
    };

    blockedStatus = () => {
        if (this.state.companyMode === 1) {
            let filterClients = this.state.clientsMts.filter((item) => {
                     return item.balance < 0;
                }
            );
            this.setState({clientsChange: filterClients, statusMode: 2});
        } else {
            let filterClients = this.state.clientsVelcom.filter((item) => {
                     return item.balance < 0;
                }
            );
            this.setState({clientsChange: filterClients, statusMode: 2});
        }
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
