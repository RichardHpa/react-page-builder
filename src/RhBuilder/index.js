import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH, faPlus, faTimes, faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'

import './builder.scss';

class RhBuilder extends Component {
    constructor (props) {
        super(props)
        this.state = {
            currentBlocks: [],
            iterationNum: 0
        }
    }

    addBlock = () => {
        const { currentBlocks, iterationNum } = this.state;
        const newBlock = {
            id: iterationNum,
            block_type: 'type',
            block_content: null,
            originalID: null
        }
        currentBlocks.push(newBlock);
        this.setState({
            currentBlocks: currentBlocks,
            iterationNum: iterationNum + 1
        })
    }

    render(){
        const { currentBlocks } = this.state;
        return (
            <div className="rhBuilder">
            {
                currentBlocks.map((singleBlock, i) => (
                    <SingleBlock key={singleBlock} blockNum={i}/>
                ))
            }

                <div className="addNew">
                    <span className="rhIcon" onClick={this.addBlock}><FontAwesomeIcon icon={faPlus} size="lg"/></span>
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

    toggleShowMore = () => {
        this.setState({
            toolTip: !this.state.toolTip
        })
    }
    render(){
        const {toolTip} = this.state;
        return(
            <div className="singleBlock">
                <div className="content">
                    Block {this.props.blockNum}
                </div>
                <div className="moreControl">
                    <span className="rhIcon more" onClick={this.toggleShowMore}><FontAwesomeIcon icon={faEllipsisH} size="lg"/></span>
                    {
                        toolTip &&
                         <div className="tooltiptext" onMouseLeave={this.toggleShowMore}>
                            <FontAwesomeIcon icon={faTimes} size="lg"/>
                            <FontAwesomeIcon icon={faArrowUp} size="lg"/>
                            <FontAwesomeIcon icon={faArrowDown} size="lg"/>
                        </div>
                    }

                </div>

            </div>
        )
    }
}
