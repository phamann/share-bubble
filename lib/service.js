import React from 'react';

var Service = React.createClass({
    displayName: 'ShareService',
    render: function() {
        return DOM.button({
            className: `i-service i-service--${this.props.name}`
        }, this.props.name);
    }
});
