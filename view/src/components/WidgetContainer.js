import React from 'react';

import Widget from './Widget';
import './WidgetContainer.css';

class WidgetContainer extends React.Component{
    state = {
        size: null,
        backgroundColor: null
    }

    componentDidMount(){
        this.setState({size: this.props.size, backgroundColor: this.props.backgroundColor})
    }

    render(){
        return(
            <div className={this.state.size} style={{background: `${this.state.backgroundColor}`}}>
                <Widget />
            </div>
        )
    }
}

export default WidgetContainer;