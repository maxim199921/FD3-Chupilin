"use strict";

import React from 'react';
import renderer from 'react-test-renderer';

import './MobileCompany.css';
import MobileCompany from '../components/MobileCompany';


test('работа фильтрации при нажатии кнопки активные и не активные клиенты', () => {

    // создаём тестовую версию компонента
    const component = renderer.create(
        <MobileCompany />
    );


    // получаем снэпшот (HTML-снимок) компонента для сверки, что вёрстка не испортилась
    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    const buttonElemActive = component.root.find( el => el.props.value==='активные' );
    const buttonElemBlocked = component.root.find( el => el.props.value==='заблокированные');
    const buttonElemAll = component.root.find( el => el.props.value==='все');

    buttonElemActive.props.onClick();

    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    buttonElemActive.props.onClick();

    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    buttonElemBlocked.props.onClick();

    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    buttonElemAll.props.onClick();

    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();
});
