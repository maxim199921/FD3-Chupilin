"use strict";

import {deleteItemFilterFunc} from '../modules/delete';

test('проверка удаления клиента', () => {

    let clientsMts = [
                        {id: 1111, f: "Иванов", i: "Игорь", o: "Иванович", balance: 200},
                        {id: 1112, f: "Сидоров", i: "Сергей", o: "Леонидович", balance: 250},
                        {id: 1113, f: "Петров", i: "Павел", o: "Сергеевич", balance: -20},
                        {id: 1114, f: "Павлов", i: "Генадий", o: "Григорьевич", balance: -220}
                    ];
    let delete1 = [
        {id: 1112, f: "Сидоров", i: "Сергей", o: "Леонидович", balance: 250},
        {id: 1113, f: "Петров", i: "Павел", o: "Сергеевич", balance: -20},
        {id: 1114, f: "Павлов", i: "Генадий", o: "Григорьевич", balance: -220}
    ];
    let delete2 = [
        {id: 1111, f: "Иванов", i: "Игорь", o: "Иванович", balance: 200},
        {id: 1113, f: "Петров", i: "Павел", o: "Сергеевич", balance: -20},
        {id: 1114, f: "Павлов", i: "Генадий", o: "Григорьевич", balance: -220}
    ];
    let delete3 = [
        {id: 1111, f: "Иванов", i: "Игорь", o: "Иванович", balance: 200},
        {id: 1112, f: "Сидоров", i: "Сергей", o: "Леонидович", balance: 250},
        {id: 1114, f: "Павлов", i: "Генадий", o: "Григорьевич", balance: -220}
    ];

  expect(deleteItemFilterFunc(clientsMts, 1111)).not.toBe(clientsMts); // проверка равны ли ссылки после изменений

  expect(deleteItemFilterFunc(clientsMts, 1112)).not.toBe(clientsMts);

  expect(deleteItemFilterFunc(clientsMts, 1113)).not.toBe(clientsMts);

  expect(deleteItemFilterFunc(clientsMts, 1111)).toEqual(delete1); // проверка на глубокое сравнение

  expect(deleteItemFilterFunc(clientsMts, 1112)).toEqual(delete2);

  expect(deleteItemFilterFunc(clientsMts, 1113)).toEqual(delete3);

});
