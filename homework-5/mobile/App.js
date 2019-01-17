"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import MobileCompany from './components/MobileCompany';

let clientsMts = [
    {id: 1111, f: "Иванов", i: "Игорь", o: "Иванович", balance: 200},
    {id: 1112, f: "Сидоров", i: "Сергей", o: "Леонидович", balance: 250},
    {id: 1113, f: "Петров", i: "Павел", o: "Сергеевич", balance: -20},
    {id: 1114, f: "Павлов", i: "Генадий", o: "Григорьевич", balance: -220},
];

let clientsVelcom = [
    {id: 2221, f: "Лермонтов", i: "Зеноид", o: "Викторорвич", balance: -50},
    {id: 2222, f: "Пушкин", i: "Борис", o: "Моисеевич", balance: 23},
    {id: 2223, f: "Ломоносов", i: "Галина", o: "Федоровна", balance: 20},
    {id: 2224, f: "Гуляндин", i: "Игорь", o: "Андреевич", balance: -56},
];

ReactDOM.render(
    <MobileCompany
        clientsMts={clientsMts}
        clientsVelcom={clientsVelcom}
    />
    , document.getElementById('container')
);

