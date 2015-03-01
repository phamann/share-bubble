var React = require('react'),
  SVGInjector = require('./libs/svg-injector');

svgConfig = function(args) {
  return {
    evalScripts: args.evalScripts || 'never',
    each: args.callback || null
  };
};

var SVGComponent = React.createClass({
  componentDidMount: function(){
    return SVGInjector([this.getDOMNode()], svgConfig(this.props));
  },

  render: function(){
    return React.DOM.img({
      className: this.props.className,
      'data-src': this.props.path,
      'data-fallback': this.props.fallbackPath});
  }
});

module.exports = SVGComponent
