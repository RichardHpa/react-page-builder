import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faPlus, faTimes, faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'

import './builder.scss';

class RhBuilder extends Component {
    constructor (props) {
        super(props)
        this.state = {
            currentBlocks: [],
            iterationNum: 0,
            adding: false
        }
    }

    toggleAddBlock = () => {
        this.setState({
            adding: !this.state.adding
        })
    }

    addBlock = (type) => {
        const { currentBlocks, iterationNum } = this.state;
        const newBlock = {
            id: iterationNum,
            block_type: type,
            block_content: null,
            originalID: null
        }
        currentBlocks.push(newBlock);
        this.setState({
            currentBlocks: currentBlocks,
            iterationNum: iterationNum + 1,
            adding: false
        })
    }

    handleDeleteBlock = (id) => {
        const { currentBlocks } = this.state;
        for (var i = 0; i < currentBlocks.length; i++) {
            if(currentBlocks[i].id === id){
                currentBlocks.splice(i, 1);
                break;
            }
        }
        this.setState({
            currentBlocks
        })
    }

    handleMoveBlock = (id, type) => {
        const { currentBlocks } = this.state;
        for (var i = 0; i < currentBlocks.length; i++) {
            if(currentBlocks[i].id === id){
                let newIndex;
                if(type === 'up'){
                    newIndex = i + -1;
                } else{
                    newIndex = i + 1;
                }
                if (newIndex < 0  || newIndex === currentBlocks.length) return;
                let block = currentBlocks.splice(i, 1);
                currentBlocks.splice(newIndex, 0, block[0]);
                break;
            }
        }
        this.setState({
            currentBlocks
        })
    }

    render(){
        const { currentBlocks, adding } = this.state;
        return (
            <div className={`rhBuilder`}>
            {
                currentBlocks.map((singleBlock, i) => (
                    <SingleBlock
                        key={singleBlock.id}
                        blockInfo={singleBlock}
                        deleteBlock={this.handleDeleteBlock}
                        moveBlock={this.handleMoveBlock}
                    />
                ))
            }
                <div className="rhAddNew">
                    <span className={`rhIcon ${adding && 'rhAdding'}`} onClick={this.toggleAddBlock}><FontAwesomeIcon icon={faPlus} size="lg"/></span>
                    {
                        adding &&
                        <div className="rhBlocks">
                            <span className="rhBlockIcon" onClick={this.addBlock.bind(this, 'text')}>Text Block</span>
                            <span className="rhBlockIcon" onClick={this.addBlock.bind(this, 'image')}>Image Block</span>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default RhBuilder;


class SingleBlock extends Component {
    constructor(props){
        super(props)
        this.state = {
            toolTip: false
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        const { toolTip } = this.state;
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)){
            if(toolTip === true){
                this.setState({
                    toolTip: false
                })
            }
        }
    }

    toggleShowMore = () => {
        this.setState({
            toolTip: !this.state.toolTip
        })
    }
    setWrapperRef = (node) => {
      this.wrapperRef = node;
    }

    deleteBlock = () => {
        this.setState({
            toolTip: false
        })
        this.props.deleteBlock(this.props.blockInfo.id);
    }

    moveBlock = (moveType) => {
        console.log(moveType);
        this.setState({
            toolTip: false
        })
        this.props.moveBlock(this.props.blockInfo.id, moveType);
    }

    render(){
        const {toolTip} = this.state;
        return(
            <div className="rhSingleBlock">
                <div className="rhContent">
                    Block {this.props.blockInfo.block_type} #{this.props.blockInfo.id}
                </div>
                <div className="moreControl">
                    <span className="rhIcon more" onClick={this.toggleShowMore}><FontAwesomeIcon icon={faEllipsisH} size="lg"/></span>
                    {
                        toolTip &&
                         <div className="tooltiptext" ref={this.setWrapperRef}>
                            <FontAwesomeIcon icon={faTimes} size="lg" onClick={this.deleteBlock}/>
                            <FontAwesomeIcon icon={faArrowUp} size="lg" onClick={this.moveBlock.bind(this, 'up')}/>
                            <FontAwesomeIcon icon={faArrowDown} size="lg"onClick={this.moveBlock.bind(this, 'down')}/>
                        </div>
                    }

                </div>

            </div>
        )
    }
}
