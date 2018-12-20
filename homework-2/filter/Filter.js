var Filter = React.createClass({

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
        this.setState( {text: evt.target.value} );
    },

    workMode: function () {
        this.state.checkstatus === false ? this.setState( {checkstatus: true} ) : this.setState( {checkstatus: false} );
    },

    arrResult: function (filterList) {
        return this.state.checkstatus === true
            ? this.filterFunc(filterList).sort((x, y) => (y.string > x.string) ? -1 : null)
            : this.filterFunc(filterList);
    },

    render: function() {

        var filterListResult = this.arrResult(this.props.filterList).map( (item) =>
            React.DOM.li({key:item.code, className:'filtritem'},item.string)
        );
        return React.DOM.div( {className:'main-filter'},
            React.DOM.input( {className:'sort', type: 'checkbox', onClick: this.workMode}),
            React.DOM.input( {className:'input-filter', type: 'text', defaultValue: this.state.text, onChange: this.filterValue},),
            React.DOM.ul( {className:'ishoplist'}, filterListResult ),
        );
    },

});