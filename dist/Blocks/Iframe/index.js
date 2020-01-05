function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react'; // https://www.youtube.com/embed/4u4ARdtkGuM

class IFrameBlock extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "editUrl", e => {
      this.setState({
        url: e.target.value
      });
    });

    _defineProperty(this, "addUrl", e => {
      const expression = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

      if (expression.test(this.state.url)) {
        this.setState({
          urlActive: true
        });
      }
    });

    this.state = {
      url: '',
      urlActive: false
    };
  }

  render() {
    const {
      url,
      urlActive
    } = this.state;
    return React.createElement("div", {
      className: `iframe-container ${urlActive && 'iframe-active'}`
    }, urlActive ? React.createElement("iframe", {
      src: url,
      title: url
    }) : React.createElement("div", {
      className: "rhGroup"
    }, React.createElement("input", {
      className: "rhInput",
      value: url,
      onChange: this.editUrl,
      type: "url"
    }), React.createElement("button", {
      onClick: this.addUrl
    }, "Add Iframe URL")));
  }

}

export default IFrameBlock;