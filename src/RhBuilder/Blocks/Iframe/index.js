import React, { Component } from 'react';

// https://www.youtube.com/embed/4u4ARdtkGuM

class IFrameBlock extends Component{
    constructor(props){
        super(props);

        this.state = {
            url: '',
            urlActive: false
        }
    }

    editUrl = (e) => {
        this.setState({
            url: e.target.value
        })
    }

    addUrl = (e) => {

        const expression = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

        if(expression.test(this.state.url)){
            this.setState({
                urlActive: true
            })
        }

    }

    render(){
        const { url, urlActive } = this.state;
        return(
            <div className={`iframe-container ${urlActive && 'iframe-active'}`}>
                {
                    urlActive ?
                        <iframe src={url} title={url}></iframe>
                    :
                    <div className="rhGroup">
                        <input className="rhInput" value={url} onChange={this.editUrl} type="url"/>
                        <button onClick={this.addUrl}>Add Iframe URL</button>
                    </div>

                }
            </div>
        )
    }
}

export default IFrameBlock;
