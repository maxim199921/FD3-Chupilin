import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import ServicesComments from './ServicesComments/ServicesComments'
import './ServicesPage.css';
import isoFetch from "isomorphic-fetch";
import {FETCH_DATA_COMENTS_FAILURE, FETCH_DATA_COMENTS_SUCCESS} from "../../redux/ActionCreaters/CommentsActions";

class ServicesPage extends React.PureComponent {

  static propTypes = {
      commentsList: PropTypes.arrayOf(
          PropTypes.shape({
              name: PropTypes.string.isRequired,
              comment: PropTypes.string.isRequired,
          })
      ),
  };

    componentDidMount = () => {
        this.loadDataComments();
    };

    loadDataComments = () => {
        let sp = new URLSearchParams();
        sp.append('f', 'READ');
        sp.append('n', 'CHUPILIN_COMMENTS_LIST');
        isoFetch("http://fe.it-academy.by/AjaxStringStorage2.php", {
            method: 'POST',
            headers: {
                "Accept": "application/json",
            },
            body: sp,
        })
            .then( (response) => { // response - HTTP-ответ
                if (!response.ok) {
                    let Err=new Error("fetch error " + response.status);
                    Err.userMessage="Ошибка связи";
                    throw Err; // дальше по цепочке пойдёт отвергнутый промис
                }
                else
                    return response.json(); // дальше по цепочке пойдёт промис с пришедшими по сети данными
            })
            .then( (data) => {
                try {
                    this.fetchSuccessComments(JSON.parse(data.result)); // передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
                }
                catch ( error ){
                    this.fetchErrorComments(error.message); // если что-то пошло не так - дальше по цепочке пойдёт отвергнутый промис
                }
            })
            .catch( (error) => {
                this.fetchErrorComments(error.userMessage||error.message);
            })
        ;

    };
    fetchErrorComments = (errorMessage) => {
        this.props.dispatch( { type: FETCH_DATA_COMENTS_FAILURE } );
    };
    fetchSuccessComments = (loadedData) => {
        this.props.dispatch( { type: FETCH_DATA_COMENTS_SUCCESS, commentsList: loadedData.commentsList} );
    };

  render() {

      let commentList = this.props.commentsList.map((item, index) =>
          <ServicesComments key={index}
                      info={item}/>
      );

    return (
      <div className="ServicesPage">
          <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12 ServicesPage-wrapper">
                            <h2 className="ServicesPage-Comments-text">Comments</h2>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                {commentList}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-12 ServicesPage-wrapper">
                            <h2 className="ServicesPage-services-text">Services</h2>
                        </div>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-12 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 HomePage-Services-img-wrapper">
                                            <div className="HomePage-Services-img1">
                                                <span hidden={true}>img</span>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <p className="HomePage-Services-text">Work with love</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 HomePage-Services-img-wrapper">
                                            <div className="HomePage-Services-img2">
                                                <span hidden={true}>img</span>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <p className="HomePage-Services-text">Best guarantee</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 HomePage-Services-img-wrapper">
                                            <div className="HomePage-Services-img3">
                                                <span hidden={true}>img</span>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <p className="HomePage-Services-text">Permanent discount</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="row">
                                        <div className="col-12 HomePage-Services-img-wrapper">
                                            <div className="HomePage-Services-img4">
                                                <span hidden={true}>img</span>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <p className="HomePage-Services-text">Fast delivery</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
    );

  }

}


const mapStateToProps = function (state) {
    return {
        commentsList: state.comments.commentsList.slice(-5).reverse(),
    };
};


export default connect(mapStateToProps)(ServicesPage);
