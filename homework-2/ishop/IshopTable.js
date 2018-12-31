var IshopTable = React.createClass({

    displayName: 'IshopTable',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        ishopList: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string.isRequired,
                price: React.PropTypes.number.isRequired,
                url: React.PropTypes.string.isRequired,
                quantity: React.PropTypes.number.isRequired,
            })
        )
    },

    getInitialState: function () {
        return {
            ishopList: this.props.ishopList,
            selectedCode: null,
        };
    },

    delete: function (code) {
        if (confirm('Вы уверены?')) {
            this.setState({
                    ishopList: this.state.ishopList.filter((item) => {
                            return item.code !== code;
                        }
                    )
                }
            );
        }
    },

    changeBackgroundItem: function (evt, key) {
        this.setState({selectedCode: key});
    },

    render: function () {
        var ishopListResult = this.state.ishopList.map((item) =>
            React.createElement(IshopItem, {
                key: item.code,
                code: item.code,
                name: item.name,
                price: item.price,
                url: item.url,
                quantity: item.quantity,
                selectedCode: this.state.selectedCode,
                cbdelete: this.delete,
                cbchangeBackgroundItem: this.changeBackgroundItem
            })
        );

        return React.DOM.div({className: 'ishopTable'},
            React.DOM.div({className: 'nameShop'}, this.props.name),
            React.DOM.div({className: 'ishoplist',}, ishopListResult),
        );
    },

});