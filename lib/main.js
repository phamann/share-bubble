import React from 'react';
import ShareBubble from './bubble';

let Bubble = React.createFactory(ShareBubble);

React.render(
    React.createElement(
        Bubble,
        {
            services: ['twitter', 'facebook'],
            pageUrl: window.location
        }
    ),
    document.body
);

