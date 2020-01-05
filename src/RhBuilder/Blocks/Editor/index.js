import React, { Component } from 'react';
import  RhEditor  from 'rh-editor'

class EditorBlock extends Component{
    render(){
        return(
            <div>
                <RhEditor
                    showControls
                />
            </div>
        )
    }
}

export default EditorBlock;
