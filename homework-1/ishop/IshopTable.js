var IshopTable = React.createClass({

  displayName: 'IshopTable',

  propTypes: {
      name: React.PropTypes.string.isRequired,
      ishopList:React.PropTypes.arrayOf(
        React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            price: React.PropTypes.number.isRequired,
            url: React.PropTypes.string.isRequired,
            quantity: React.PropTypes.number.isRequired,
        })
      )
  },

  render: function() {

        var ishopListResult = this.props.ishopList.map( (item) =>
            React.DOM.div({key:item.code,className:'tableItem'},
                React.DOM.span({className:'nameItem'},item.name),
                React.DOM.span({className:'price'},item.price),
                React.DOM.span({className:'url'},item.url),
                React.DOM.span({className:'quantity'},item.quantity),
            )
          );
        return React.DOM.div( {className:'ishopTable'},
          React.DOM.div( {className:'nameShop'}, this.props.name ),
          React.DOM.div( {className:'ishoplist'}, ishopListResult ),
        );
      },
    
});