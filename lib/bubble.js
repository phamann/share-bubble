import React from 'react';
import svg from 'react-svg';
import draggable from 'react-draggable';
import services from './services';

let SVG = React.createFactory(svg);
let Draggable = React.createFactory(draggable);
let Services = React.createFactory(services);

let getInitialPos = function() {
    return { x: window.innerWidth - 75, y: window.innerHeight - 75 };
}

let getLayoutDirection = function(pos) {
    return {
        above: pos.top > window.innerHeight/2,
        right: pos.left < window.innerWidth/2
    };
}

let ShareBubble = React.createClass({
    displayName: 'ShareBubble',
    hasMoved: function(pos) {
        return this.state.prevPos.left !== pos.left && this.state.prevPos.top !== pos.top;
    },
    handleStart: function(event, ui) {
        this.setState({prevPos: ui.position});
    },
    handleDrag: function (event, ui) {
        if(this.state.showServices) {
            this.setState({ showServices: false });
        }
    },
    handleStop: function(e, ui) {
        if(this.hasMoved(ui.position)) {
            this.setState({
                showServices: false,
                hasMoved: true,
                layoutDirection: getLayoutDirection(ui.position)
            });
        } else {
            this.setState({hasMoved: false});
        }
    },
    getInitialState: function() {
        return {
            showServices: false,
            hasMoved: false,
            layoutDirection: { above: true, right: false}
        };
    },
    buttonClick: function(event) {
        if(!this.state.hasMoved) {
            this.setState({showServices: !this.state.showServices });
        }
    },
    render: function() {
        return Draggable({
            start: getInitialPos(),
            zIndex: 100,
            onStart: this.handleStart,
            onDrag: this.handleDrag,
            onStop: this.handleStop
        },
        React.DOM.div({
                className: 'share-bubble'
            },
            React.DOM.button(
                {
                    className: 'share-bubble__btn',
                    onClick: this.buttonClick
                },
                SVG({
                    path: 'img/share.svg',
                    className: 'i i--share'
                })
            ),
            (this.state.showServices) ? Services({services: this.props.services, layoutDirection: this.state.layoutDirection}) : null
        )
       );
    }
});

export default ShareBubble;

