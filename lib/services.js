import React from 'react';
import svg from 'react-svg';

let SVG = React.createFactory(svg);
let ReactCSSTransitionGroup = React.createFactory(React.addons.CSSTransitionGroup);
let cx = React.addons.classSet;

let Services = React.createClass({
    displayName: 'ShareServices',
    getInitialState: function() {
        return {
            items: 0,
            services: []
        };
    },
    isFullyRendered: function() {
        return this.isMounted() && this.state.services.length === this.props.services.length
    },
    incrementItems: function() {
        this.setState({
            services: this.state.services.concat(this.props.services[this.state.items]),
            items: this.state.items + 1
        });
    },
    componentDidMount: function(){
        if(this.isMounted()) this.incrementItems();
    },
    componentDidUpdate: function() {
        if(!this.isFullyRendered()) {
            setTimeout(this.incrementItems, 50);
        }
    },
    render: function() {
        var services = this.state.services.map((name, i) => {
            return React.DOM.li({
                key: name,
                className: `service service--${name}`,
            },
            SVG({
                path:`img/${name}.svg`,
                className: `service__icon i i--${name}`
            }),
            React.DOM.span({
                className: 'service__label'
            }, name.toUpperCase()));
        });

        console.log(this.props.layoutDirection);

        return ReactCSSTransitionGroup({
            component: 'ul',
            transitionName: 'share-bubble__services',
            className: cx({
                'share-bubble__services': true,
                'share-bubble__services--above': this.props.layoutDirection.above,
                'share-bubble__services--right': this.props.layoutDirection.right
            })}, services.length ? services : null);
    }
});

export default Services;
