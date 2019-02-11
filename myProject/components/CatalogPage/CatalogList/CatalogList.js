import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {activeStatusSwitch} from '../../../redux/ActionCreaters/CatalogActions'


import './CatalogList.css';

class CatalogList extends React.PureComponent {

    static propTypes = {
        info: PropTypes.shape({
            id: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
            model: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            status: PropTypes.bool.isRequired,
        }),
    };

    addProduct = () => {
        if (this.props.info.status) {
            this.switchStatus(this.props.info.id, false);
        } else {
            this.switchStatus(this.props.info.id, true);
        }
    };
    switchStatus = (id, status) => {this.props.dispatch( activeStatusSwitch(id, status) )};

    render() {
        // console.log(`рендерится элемента под номером ${this.props.info.id}`);
        return (
            <div className="col-12 col-sm-6 col-lg-3 CatalogList">
                <div className="row CatalogList-wrapper">
                    <div className={this.props.info.status ? "addActive" : "addBlock"}></div>
                    <div className="col-12 CatalogList-type">{this.props.info.type}</div>
                    <div className="col-12 CatalogList-img-wrapper">
                        <img className="CatalogList-img" src={this.props.info.img}/>
                    </div>
                    <div className="col-12 CatalogList-model">{this.props.info.model}</div>
                    <div className="col-12">
                        <div className="row price-wrapper">
                            <div className="col-4 CatalogList-price">{this.props.info.price}</div>
                            <div className="col-4 CatalogList-button">
                                <input type="button" className="btn btn-info btn-primary-add" value="add"
                                       onClick={this.addProduct}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}

const mapStateToProps = function (state) {
    return {};
};


export default connect(mapStateToProps)(CatalogList);

