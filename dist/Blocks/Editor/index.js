import React, { Component } from 'react';
import RhEditor from 'rh-editor';

class EditorBlock extends Component {
  render() {
    return React.createElement("div", null, React.createElement(RhEditor, {
      showControls: true
    }));
  }

}

export default EditorBlock;