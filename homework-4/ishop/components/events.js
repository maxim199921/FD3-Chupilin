import {EventEmitter} from 'events';

let ishopEvents=new EventEmitter();
// в потоке ishopEvents будут все события, связанные добавлением удалением элементов ishop
// событие "evtSaveEdit" - кликнута кнопка сохранения изменения элемента списка ishop, его сэмиттирует IshopForms и примет IshopTable
// событие "evtInitWorkMode" - кликнута кнопка закрыть вкладку редактирования элемента, его сэмиттирует IshopForms и примет IshopTable
// лучше работать не с текстовыми литералами, а объявить переменные с соответствующими значениями

export {ishopEvents};
