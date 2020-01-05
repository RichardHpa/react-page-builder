function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faPlus, faTimes, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import EditorBlock from './Blocks/Editor';
import ImageBlock from './Blocks/Image';
import IFrameBlock from './Blocks/Iframe';
import './builder.scss';

class RhBuilder extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "toggleAddBlock", () => {
      this.setState({
        adding: !this.state.adding
      });
    });

    _defineProperty(this, "addBlock", type => {
      const {
        currentBlocks,
        iterationNum
      } = this.state;
      const newBlock = {
        id: iterationNum,
        block_type: type,
        block_content: null,
        originalID: null
      };
      currentBlocks.push(newBlock);
      this.setState({
        currentBlocks: currentBlocks,
        iterationNum: iterationNum + 1,
        adding: false
      });
    });

    _defineProperty(this, "handleDeleteBlock", id => {
      const {
        currentBlocks
      } = this.state;

      for (var i = 0; i < currentBlocks.length; i++) {
        if (currentBlocks[i].id === id) {
          currentBlocks.splice(i, 1);
          break;
        }
      }

      this.setState({
        currentBlocks
      });
    });

    _defineProperty(this, "handleMoveBlock", (id, type) => {
      const {
        currentBlocks
      } = this.state;

      for (var i = 0; i < currentBlocks.length; i++) {
        if (currentBlocks[i].id === id) {
          let newIndex;

          if (type === 'up') {
            newIndex = i + -1;
          } else {
            newIndex = i + 1;
          }

          if (newIndex < 0 || newIndex === currentBlocks.length) return;
          let block = currentBlocks.splice(i, 1);
          currentBlocks.splice(newIndex, 0, block[0]);
          break;
        }
      }

      this.setState({
        currentBlocks
      });
    });

    this.state = {
      currentBlocks: [],
      iterationNum: 0,
      adding: false
    };
  }

  render() {
    const {
      currentBlocks,
      adding
    } = this.state;
    return React.createElement("div", {
      className: `rhBuilder`
    }, currentBlocks.map((singleBlock, i) => React.createElement(SingleBlock, {
      key: singleBlock.id,
      blockInfo: singleBlock,
      deleteBlock: this.handleDeleteBlock,
      moveBlock: this.handleMoveBlock
    })), React.createElement("div", {
      className: "rhAddNew"
    }, React.createElement("span", {
      className: `rhIcon ${adding && 'rhAdding'}`,
      onClick: this.toggleAddBlock
    }, React.createElement(FontAwesomeIcon, {
      icon: faPlus,
      size: "lg"
    })), adding && React.createElement("div", {
      className: "rhBlocks"
    }, React.createElement("div", {
      className: "rhBlockIcon",
      onClick: this.addBlock.bind(this, 'textBlock')
    }, "Text Block"), React.createElement("div", {
      className: "rhBlockIcon",
      onClick: this.addBlock.bind(this, 'imageBlock')
    }, "Image Block"), React.createElement("div", {
      className: "rhBlockIcon",
      onClick: this.addBlock.bind(this, 'iframeBlock')
    }, "Iframe Block"))));
  }

}

export default RhBuilder;

class SingleBlock extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleClickOutside", event => {
      const {
        toolTip
      } = this.state;

      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        if (toolTip === true) {
          this.setState({
            toolTip: false
          });
        }
      }
    });

    _defineProperty(this, "toggleShowMore", () => {
      this.setState({
        toolTip: !this.state.toolTip
      });
    });

    _defineProperty(this, "setWrapperRef", node => {
      this.wrapperRef = node;
    });

    _defineProperty(this, "deleteBlock", () => {
      this.setState({
        toolTip: false
      });
      this.props.deleteBlock(this.props.blockInfo.id);
    });

    _defineProperty(this, "moveBlock", moveType => {
      console.log(moveType);
      this.setState({
        toolTip: false
      });
      this.props.moveBlock(this.props.blockInfo.id, moveType);
    });

    this.state = {
      toolTip: false
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  render() {
    const {
      toolTip
    } = this.state;
    return React.createElement("div", {
      className: "rhSingleBlock"
    }, React.createElement("div", {
      className: "rhContent"
    }, (() => {
      switch (this.props.blockInfo.block_type) {
        case 'imageBlock':
          return React.createElement(ImageBlock, {
            blockContent: this.props.blockInfo.block_content,
            sendContent: this.handleSendContent
          });

        case 'textBlock':
          return React.createElement(EditorBlock, {
            blockContent: this.props.blockInfo.block_content,
            sendContent: this.handleSendContent
          });

        case 'iframeBlock':
          return React.createElement(IFrameBlock, {
            blockContent: this.props.blockInfo.block_content,
            sendContent: this.handleSendContent
          });

        default:
          return null;
      }
    })()), React.createElement("div", {
      className: "moreControl"
    }, React.createElement("span", {
      className: "rhIcon more",
      onClick: this.toggleShowMore
    }, React.createElement(FontAwesomeIcon, {
      icon: faEllipsisH,
      size: "lg"
    })), toolTip && React.createElement("div", {
      className: "tooltiptext",
      ref: this.setWrapperRef
    }, React.createElement(FontAwesomeIcon, {
      icon: faTimes,
      size: "lg",
      onClick: this.deleteBlock
    }), React.createElement(FontAwesomeIcon, {
      icon: faArrowUp,
      size: "lg",
      onClick: this.moveBlock.bind(this, 'up')
    }), React.createElement(FontAwesomeIcon, {
      icon: faArrowDown,
      size: "lg",
      onClick: this.moveBlock.bind(this, 'down')
    }))));
  }

}