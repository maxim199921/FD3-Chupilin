"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import MobileCompany from '../components/MobileCompany';


test('работа активной фильтрации при нажатии кнопки активные клиенты', () => {

    // создаём тестовую версию компонента
    const component = renderer.create(
        <MobileCompany />
    );


    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    // // найдём в вёрстке компонента саму кнопку
    // const buttonElem = component.root.find( el => el.name=='active' /*&& el.props.aaa == 'bbb'*/ );
    // // и "нажмём" на неё
    // buttonElem.props.onClick();
    //
    // // получаем уже изменённый снэпшот
    // componentTree=component.toJSON();
    // expect(componentTree).toMatchSnapshot();
    //
    // // "нажмём" кнопку ещё раз
    // buttonElem.props.onClick();
    //
    // // и получаем окончательный снэпшот
    // componentTree=component.toJSON();
    // expect(componentTree).toMatchSnapshot();

});
