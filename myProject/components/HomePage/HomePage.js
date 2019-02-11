import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import './HomePage.css';
import isoFetch from "isomorphic-fetch";
import {connect} from "react-redux";
import {FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE, filterLaptor, filterPhone, filterTablet} from '../../redux/ActionCreaters/CatalogActions'
import {FETCH_DATA_COMENTS_SUCCESS, FETCH_DATA_COMENTS_FAILURE,} from '../../redux/ActionCreaters/CommentsActions'
class HomePage extends React.PureComponent {

  static propTypes = {};

    state = {
        successComment: false,
        nameComValue: null,
        comValue: null,
    };

    componentDidMount = () => {
        this.loadData();
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

    loadData = () => {
        let sp = new URLSearchParams();
        sp.append('f', 'READ');
        sp.append('n', 'CHUPILIN_PRIC_LIST');
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
                    this.fetchSuccess(JSON.parse(data.result)); // передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
                }
                catch ( error ){
                    this.fetchError(error.message); // если что-то пошло не так - дальше по цепочке пойдёт отвергнутый промис
                }
            })
            .catch( (error) => {
                this.fetchError(error.userMessage||error.message);
            })
        ;

    };
    fetchError = (errorMessage) => {
        this.props.dispatch( { type: FETCH_DATA_FAILURE } );
    };
    fetchSuccess = (loadedData) => {
        this.props.dispatch( { type: FETCH_DATA_SUCCESS, priceList: loadedData.priceList} );
    };

    showLaptor = () => {this.props.dispatch( filterLaptor('Laptop') )};
    showPhone = () => {this.props.dispatch( filterPhone('Phone') )};
    showTablet = () => {this.props.dispatch( filterTablet('Tablet') )};

    addComments = () => {
        this.setState({successComment: true});
        let sp = new URLSearchParams();
        this.updatePassword = Math.random();
        sp.append('f', 'LOCKGET');
        sp.append('n', 'CHUPILIN_COMMENTS_LIST');
        sp.append('p', this.updatePassword);
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
                    this.fetchSuccessAddComments(data, this.updatePassword); // передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
                }
                catch ( error ){
                    this.fetchErrorAddComments(error.message); // если что-то пошло не так - дальше по цепочке пойдёт отвергнутый промис
                }
            })
            .catch( (error) => {
                this.fetchErrorAddComments(error.userMessage||error.message);
            });
    };
    fetchSuccessAddComments = (callresult, updatePassword) => {
        if (callresult.error !== undefined){
        }
        else {
            let message = JSON.parse(callresult.result);
            let newcomm = {
                name: this.state.nameComValue,
                comment: this.state.comValue,
            };
            message['commentsList'].push(newcomm);
            let sp2 = new URLSearchParams();
            sp2.append('f', 'UPDATE');
            sp2.append('n', 'CHUPILIN_COMMENTS_LIST');
            sp2.append('v', JSON.stringify(message));
            sp2.append('p', updatePassword);
            isoFetch("http://fe.it-academy.by/AjaxStringStorage2.php", {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                },
                body: sp2,
            })
        }
    };
    fetchErrorAddComments = (errorMessage) => {
        this.props.dispatch( { type: FETCH_DATA_COMENTS_FAILURE } );
    };

    getCommentName = (evt) => {
        this.setState({nameComValue: evt.target.value});
    };
    getCommentCurrent = (evt) => {
        this.setState({comValue: evt.target.value});
    };

    render() {

    return (
      <div className="HomePage">
          <div className="HomePage-Carousel">
              <div className="container">
                  <div className="row">
                      <div className="col-12">
                          <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                              <div className="carousel-inner">
                                  <div className="carousel-item active">
                                      <img className="d-block w-100" src="../../img/slider-img1.jpg" alt="First slide"/>
                                  </div>
                                  <div className="carousel-item">
                                      <img className="d-block w-100" src="../../img/slider-img2.jpg"  alt="Second slide"/>
                                  </div>
                              </div>
                              <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                  <span className="sr-only">Previous</span>
                              </a>
                              <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                  <span className="sr-only">Next</span>
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="container">
              <div className="row">
                  <div className="col-12 HomePage-Services">
                      <span className="HomePage-Services-Color">OUR </span>
                      SERVICES
                  </div>
              </div>
              <div className="row">
                  <div className="col-12 col-sm-6 col-md-3">
                    <div className="row">
                      <div className="col-12 HomePage-Services-img-wrapper">
                          <div className="HomePage-Services-img1">
                              <span hidden={true}>img</span>
                          </div>
                      </div>
                      <div className="col-12">
                          <p className="HomePage-Services-text">We treat each client with warmth and respect</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3">
                      <div className="row">
                          <div className="col-12 HomePage-Services-img-wrapper">
                              <div className="HomePage-Services-img2">
                                  <span hidden={true}>img</span>
                              </div>
                          </div>
                          <div className="col-12">
                              <p className="HomePage-Services-text">Best service, excellent quality, and fastest delivery</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3">
                      <div className="row">
                          <div className="col-12 HomePage-Services-img-wrapper">
                              <div className="HomePage-Services-img3">
                                  <span hidden={true}>img</span>
                              </div>
                          </div>
                          <div className="col-12">
                              <p className="HomePage-Services-text">Online consultants will help you find the right product</p>
                          </div>
                      </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-3">
                      <div className="row">
                          <div className="col-12 HomePage-Services-img-wrapper">
                              <div className="HomePage-Services-img4">
                                  <span hidden={true}>img</span>
                              </div>
                          </div>
                          <div className="col-12">
                              <p className="HomePage-Services-text">You can track your order online all time</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="HomePage-wrapper-comments">
              <div className="container">
                  <div className="row">
                      <div className="col-12 col-sm-8 col-lg-10 HomePage-wrapper-comments-text">If you like our products and would like to leave feedback please click here, your feedback is very important to us to improve our service</div>
                      <div className="col-12 col-sm-4 col-lg-2 align-self-center HomePage-wrapper-comments-btn">
                          <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">Comments</button>

                          <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="false">
                              <div className="vertical-alignment-helper">
                                  <div className="modal-dialog modal-sm vertical-align-center">
                                      <div className="modal-content">
                                          <div className="container">
                                              <div className="row">
                                                  {
                                                      this.state.successComment ?
                                                          <div className="col-12 success-order">
                                                              <h2 className="success-order-text">Your comment add, Thank you</h2>
                                                          </div>
                                                          :
                                                          <div className="col-12">
                                                              <div className="col-12">
                                                                  <input type="text" className="BasketPage-form-name" placeholder="Please enter name"
                                                                         onChange={this.getCommentName}/>
                                                              </div>
                                                              <div className="col-12">
                                                                  <textarea rows="6" className="BasketPage-form-phone" placeholder="Please enter comment"
                                                                            onChange={this.getCommentCurrent}/>
                                                              </div>
                                                              <div className="col-12">
                                                                  <input type="button" className="btn btn-primary BasketPage-form-btn" value="add comment"
                                                                         onClick={this.addComments}
                                                                         disabled={!this.state.nameComValue||!this.state.comValue ? true : null}/>
                                                              </div>
                                                          </div>
                                                  }
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
          <div className="HomePage-wrapper-gallery">
              <div className="container">
                  <div className="row">
                      <div className="col-12 HomePage-Pricing">PRICING</div>
                  </div>
                  <div className="row">
                      <div className="col-md-4">
                          <div className="card">
                              <div className="card-body">
                                  <h5 className="card-title">Laptops</h5>
                                  <p className="card-text">The laptop is an integral part in the life of each of us. The prices will pleasantly surprise you in comparison with competitors. Here you will find a wide variety of models, the best quality also when buying a laptop bag as a gift.</p>
                                  <NavLink to="/catalogpage" className="btn btn-primary" onClick={this.showLaptor}>Catalog</NavLink>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-4">
                          <div className="card">
                              <div className="card-body">
                                  <h5 className="card-title">Phones</h5>
                                  <p className="card-text">The latest offers you will find here and now. Phones of any category from the cheapest to the most expensive. All new items only with us. Buy a phone we get a case as a gift.</p>
                                  <NavLink to="/catalogpage" className="btn btn-primary" onClick={this.showPhone}>Catalog</NavLink>
                              </div>
                          </div>
                      </div>
                      <div className="col-md-4">
                          <div className="card">
                              <div className="card-body">
                                  <h5 className="card-title">Tablets</h5>
                                  <p className="card-text">Love the convenience and style, then buy tablets from China at the cheapest prices and decent quality, warranty for each model 3 years!!! It is possible to purchase in installments or credit. The first 20 customers 50% discount!!! Don't miss your chance. Also as a gift case.</p>
                                  <NavLink to="/catalogpage" className="btn btn-primary" onClick={this.showTablet}>Catalog</NavLink>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
    ;

  }

}


const mapStateToProps = function (state) {
    return {};
};


export default connect(mapStateToProps)(HomePage);

