import React from 'react';
import { render } from 'react-dom';
import Pane from './splitpane/Pane';
import { HorizontalSplitPane } from './splitpane/SplitPane';



const SimpleCase = () => (
    <div className="simple-case">
        <HorizontalSplitPane>
        <Pane>
            <h1>Hello</h1>
        </Pane>
        <Pane>
            <h2> there!</h2>
        </Pane>
    </HorizontalSplitPane>
    </div>
)

const NestedCase = () => (
    <div className="nested-case">
        <HorizontalSplitPane>
            <Pane>
                <h1>Hello</h1>
            </Pane>
            <Pane>
                <HorizontalSplitPane>
                    <Pane>
                        <h1>nested</h1>
                    </Pane>
                    <Pane>
                        <h2> inside</h2>
                    </Pane>
                </HorizontalSplitPane>
            </Pane>
        </HorizontalSplitPane>
    </div>
)

render(<>
    <SimpleCase/>
    <NestedCase/>
</>, document.body)