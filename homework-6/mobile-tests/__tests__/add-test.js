"use strict";

import {saveNewItemImmutable} from '../modules/add';

test('проверка добавления клиента', () => {

    let clientsMts = [
        {id: 1111, f: "Иванов", i: "Игорь", o: "Иванович", balance: 200},
        {id: 1112, f: "Сидоров", i: "Сергей", o: "Леонидович", balance: 250},
        {id: 1113, f: "Петров", i: "Павел", o: "Сергеевич", balance: -20},
        {id: 1114, f: "Павлов", i: "Генадий", o: "Григорьевич", balance: -220}
    ];
    let hash1 = {id: 1115, f: "Анна", i: "Анна", o: "Анна", balance: -100};
    let add1 = [
        {id: 1111, f: "Иванов", i: "Игорь", o: "Иванович", balance: 200},
        {id: 1112, f: "Сидоров", i: "Сергей", o: "Леонидович", balance: 250},
        {id: 1113, f: "Петров", i: "Павел", o: "Сергеевич", balance: -20},
        {id: 1114, f: "Павлов", i: "Генадий", o: "Григорьевич", balance: -220},
        {id: 1115, f: "Анна", i: "Анна", o: "Анна", balance: -100}
    ];
    let hash2 = {id: 1115, f: "Вася", i: "Вася", o: "Вася", balance: 100};
    let add2 = [
        {id: 1111, f: "Иванов", i: "Игорь", o: "Иванович", balance: 200},
        {id: 1112, f: "Сидоров", i: "Сергей", o: "Леонидович", balance: 250},
        {id: 1113, f: "Петров", i: "Павел", o: "Сергеевич", balance: -20},
        {id: 1114, f: "Павлов", i: "Генадий", o: "Григорьевич", balance: -220},
        {id: 1115, f: "Вася", i: "Вася", o: "Вася", balance: 100}
    ];
    let hash3 = {id: 1115, f: "Петя", i: "Петя", o: "Петя", balance: 200};
    let add3 = [
        {id: 1111, f: "Иванов", i: "Игорь", o: "Иванович", balance: 200},
        {id: 1112, f: "Сидоров", i: "Сергей", o: "Леонидович", balance: 250},
        {id: 1113, f: "Петров", i: "Павел", o: "Сергеевич", balance: -20},
        {id: 1114, f: "Павлов", i: "Генадий", o: "Григорьевич", balance: -220},
        {id: 1115, f: "Петя", i: "Петя", o: "Петя", balance: 200}
    ];

    expect(saveNewItemImmutable(clientsMts, hash1)).not.toBe(clientsMts); // проверка равны ли ссылки после изменений

    expect(saveNewItemImmutable(clientsMts, hash2)).not.toBe(clientsMts);

    expect(saveNewItemImmutable(clientsMts, hash3)).not.toBe(clientsMts);

    expect(saveNewItemImmutable(clientsMts, hash1)).toEqual(add1); // проверка на глубокое сравнение

    expect(saveNewItemImmutable(clientsMts, hash2)).toEqual(add2);

    expect(saveNewItemImmutable(clientsMts, hash3)).toEqual(add3);

});