import React, { Component } from 'react';
import './main.css';
import Tables from './components/tables/Tables'



const Main = (props) => {

    return (
        <div className="task">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 task_title">Configure Data Fields</div>
                    <Tables
                        data={1}/>
                </div>
            </div>
        </div>
    );
};

export default Main;
