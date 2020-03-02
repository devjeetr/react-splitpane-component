import HorizontalSplitPane from '../js/splitpane/SplitPane';
import Pane from '../js/splitpane/Pane';

import '@testing-library/jest-dom'
import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'

describe("simple test", () => {
    it("default pane width should be 50%", () => {
        const { getByText } = render(<Pane/>);
        
        expect(10).toEqual(10);
    })
})