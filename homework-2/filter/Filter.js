let Filter = React.createClass({

    displayName: 'filter',

    propTypes: {
        text: React.PropTypes.string.isRequired,
        checkstatus: React.PropTypes.bool.isRequired,
        filterList: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                string: React.PropTypes.string.isRequired,
                code: React.PropTypes.number.isRequired,
            })
        )
    },

    getInitialState: function () {
        return {
            filterList: this.props.filterList,
            text: this.props.text,
            checkstatus: this.props.checkstatus,
        };
    },

    filterFunc: function (filterList) {
        return filterList.filter((item) => {
            return item.string.indexOf(this.state.text) > -1
        });
    },

    filterValue: function (evt) {
        this.setState({text: evt.target.value}, this.arrResult);
    },

    workMode: function (evt) {
        this.setState({checkstatus: evt.target.checked}, this.arrResult);
    },

    arrResult: function () {
        let filterArr = this.filterFunc(this.props.filterList);
        let finelArr = this.state.checkstatus
            ? filterArr.sort((x, y) => (y.string > x.string) ? -1 : 0)
            : filterArr;
        this.setState( {filterList: finelArr} );
    },

    render: function () {

        let filterListResult = this.state.filterList.map((item) =>
            React.DOM.li({key: item.code, className: 'filtritem'}, item.string)
        );
        return React.DOM.div({className: 'main-filter'},
            React.DOM.input({className: 'sort', type: 'checkbox', onClick: this.workMode}),
            React.DOM.input({
                className: 'input-filter',
                type: 'text',
                defaultValue: this.state.text,
                onChange: this.filterValue
            },),
            React.DOM.ul({className: 'ishoplist'}, filterListResult),
        );
    },

});