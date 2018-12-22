var IshopTable = React.createClass({

    displayName: 'IshopTable',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        prTarget: React.PropTypes.bool.isRequired,
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
            prTarget: this.props.prTarget,
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

    changeBackgroundItem: function (evt) {
        this.state.prTarget ? this.state.prTarget.style.background = 'khaki': null;
        this.setState({prTarget: evt.currentTarget});
        evt.currentTarget.style.background = 'red';
    },

    render: function () {

        var ishopListResult = this.state.ishopList.map((item) =>
            React.DOM.div({key: item.code, className: 'tableItem', onClick: this.changeBackgroundItem},
                React.DOM.span({className: 'nameItem'}, item.name),
                React.DOM.span({className: 'price'}, item.price),
                React.DOM.span({className: 'url'}, item.url),
                React.DOM.span({className: 'quantity'}, item.quantity),
                React.DOM.button({
                    className: 'delete', onClick: () => {
                        return this.delete(item.code);
                    }
                }, 'delete'),
            )
        );
        return React.DOM.div({className: 'ishopTable'},
            React.DOM.div({className: 'nameShop'}, this.props.name),
            React.DOM.div({className: 'ishoplist',}, ishopListResult),
        );
    },

});