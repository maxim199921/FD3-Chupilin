let Filter = React.createClass({

    displayName: 'filter',

    propTypes: {
        text: React.PropTypes.string.isRequired,
        checkstatus: React.PropTypes.bool.isRequired,
        filterList:React.PropTypes.arrayOf(
            React.PropTypes.shape({
                string: React.PropTypes.string.isRequired,
                code: React.PropTypes.number .isRequired,
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
        return filterList.filter( (item) => {
            return item.string.indexOf(this.state.text) > -1
        });
    },

    filterValue: function (evt) {
        this.setState( {text: evt.target.value}, this.arrResult );
    },

    workMode: function () {
        this.state.checkstatus === false
            ? this.setState( {checkstatus: true}, this.arrResult )
            : this.setState( {checkstatus: false}, this.arrResult);
    },

    arrResult: function () {
        this.state.filterList =  this.state.checkstatus === true
            ? this.setState( {filterList: this.filterFunc(this.props.filterList).sort((x, y) => (y.string > x.string) ? -1 : null)})
            : this.setState( {filterList: this.filterFunc(this.props.filterList)});
    },

    render: function() {

        let filterListResult = this.state.filterList.map( (item) =>
            React.DOM.li({key:item.code, className:'filtritem'},item.string)
        );
        return React.DOM.div( {className:'main-filter'},
            React.DOM.input( {className:'sort', type: 'checkbox', onClick: this.workMode}),
            React.DOM.input( {className:'input-filter', type: 'text', defaultValue: this.state.text, onChange: this.filterValue},),
            React.DOM.ul( {className:'ishoplist'}, filterListResult ),
        );
    },

});