import React, { Component } from 'react';

class ImageBlock extends Component {
  render() {
    return React.createElement("div", {
      className: "rhImageBlock"
    }, "This is an image Block");
  }

}

export default ImageBlock;