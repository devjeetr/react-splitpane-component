import React from 'react';
import { render } from 'react-dom';
import Pane from './splitpane/Pane';
import { HorizontalSplitPane } from './splitpane/SplitPane';

render(<HorizontalSplitPane>
        <Pane>
            <h1>Hello</h1>
        </Pane>
        <Pane>
            <h2> there!</h2>
        </Pane>
    </HorizontalSplitPane>, document.body)
