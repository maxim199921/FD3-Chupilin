var IshopItem = React.createClass({

    displayName: 'IshopItem',

    propTypes: {
        code: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        price: React.PropTypes.number.isRequired,
        url: React.PropTypes.string.isRequired,
        quantity: React.PropTypes.number.isRequired,
        selectedCode: React.PropTypes.number,
        cbdelete: React.PropTypes.func.isRequired,
        cbchangeBackgroundItem: React.PropTypes.func.isRequired,
    },

    changeBackgroundItem: function (evt) {
        this.props.cbchangeBackgroundItem(evt, this.props.code);
    },

    delete: function (evt) {
        evt.stopPropagation();
        this.props.cbdelete(this.props.code);
    },

    render: function () {

        return React.DOM.div({
                key: this.props.code,
                className: this.props.code === this.props.selectedCode ? 'tableItem changecolor' : 'tableItem',
                onClick: this.changeBackgroundItem
            },
            React.DOM.span({className: 'nameItem'}, this.props.name),
            React.DOM.span({className: 'price'}, this.props.price),
            React.DOM.span({className: 'url'}, this.props.url),
            React.DOM.span({className: 'quantity'}, this.props.quantity),
            React.DOM.button({
                className: 'delete',
                onClick: this.delete
            }, 'delete'),
        )
    },

});