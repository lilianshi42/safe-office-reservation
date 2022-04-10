import React from 'react';
import reactDom from 'react-dom';

import Home from '../Home'

test('render without crashing',()=>{
    const container = document.createElement("div");
    reactDom.render(<Home></Home>,container);
})