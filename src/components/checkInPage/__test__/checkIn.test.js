import React from 'react';
import reactDom from 'react-dom';

import CheckInPage from '../CheckInPage'

test('render without crashing',()=>{
    const container = document.createElement("div");
    reactDom.render(<CheckInPage></CheckInPage>,container);
})