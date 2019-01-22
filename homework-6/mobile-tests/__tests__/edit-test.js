"use strict";

import {editChangeItemImmutable} from '../modules/edit';

test('проверка редактирования клиента', () => {

    let clientsMts = [
        {id: 1111, f: "Иванов", i: "Игорь", o: "Иванович", balance: 200},
        {id: 1112, f: "Сидоров", i: "Сергей", o: "Леонидович", balance: 250},
        {id: 1113, f: "Петров", i: "Павел", o: "Сергеевич", balance: -20},
        {id: 1114, f: "Павлов", i: "Генадий", o: "Григорьевич", balance: -220}
    ];
    let hash1 = {id: 1111, f: "Анна", i: "Анна", o: "Анна", balance: -100};
    let edit1 = [
        {id: 1111, f: "Анна", i: "Анна", o: "Анна", balance: -100},
        {id: 1112, f: "Сидоров", i: "Сергей", o: "Леонидович", balance: 250},
        {id: 1113, f: "Петров", i: "Павел", o: "Сергеевич", balance: -20},
        {id: 1114, f: "Павлов", i: "Генадий", o: "Григорьевич", balance: -220},
    ];
    let hash2 = {id: 1112, f: "Вася", i: "Вася", o: "Вася", balance: 100};
    let edit2 = [
        {id: 1111, f: "Иванов", i: "Игорь", o: "Иванович", balance: 200},
        {id: 1112, f: "Вася", i: "Вася", o: "Вася", balance: 100},
        {id: 1113, f: "Петров", i: "Павел", o: "Сергеевич", balance: -20},
        {id: 1114, f: "Павлов", i: "Генадий", o: "Григорьевич", balance: -220},
    ];
    let hash3 = {id: 1113, f: "Петя", i: "Петя", o: "Петя", balance: 200};
    let edit3 = [
        {id: 1111, f: "Иванов", i: "Игорь", o: "Иванович", balance: 200},
        {id: 1112, f: "Сидоров", i: "Сергей", o: "Леонидович", balance: 250},
        {id: 1113, f: "Петя", i: "Петя", o: "Петя", balance: 200},
        {id: 1114, f: "Павлов", i: "Генадий", o: "Григорьевич", balance: -220},
    ];

    expect(editChangeItemImmutable(clientsMts, hash1, 1111)).not.toBe(clientsMts); // проверка равны ли ссылки после изменений

    expect(editChangeItemImmutable(clientsMts, hash2, 1112)).not.toBe(clientsMts);

    expect(editChangeItemImmutable(clientsMts, hash3, 1113)).not.toBe(clientsMts);

    expect(editChangeItemImmutable(clientsMts, hash1,1111)).toEqual(edit1); // проверка на глубокое сравнение

    expect(editChangeItemImmutable(clientsMts, hash2,1112)).toEqual(edit2);

    expect(editChangeItemImmutable(clientsMts, hash3, 1113)).toEqual(edit3);

});
