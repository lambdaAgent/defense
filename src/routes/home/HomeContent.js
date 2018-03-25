import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { connect } from 'preact-redux';

import main from './logic/mainLogic.js';
import render from './logic/renderLogic.js';

class HomeContent extends Component {
    static propTypes = {

    }

    constructor(props){
        super(props);
    }

    componentDidMount(){
        // loop main logic here
        const self = this;
        function loop(){
            const { dispatch, allReducers } = self.props;
            main({ dispatch, allReducers })
                .then(res => {
                    render({dispatch, allReducers});  
                    setTimeout(() => requestAnimationFrame(loop), 20);
                })
        }
        requestAnimationFrame(loop)
    }

    render(){
        const { worldReducer } = this.props.allReducers;
        console.log(this.props);
        console.log(worldReducer)
        return(
            <div>
                {worldReducer.timeString}
               asdfasfda
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        allReducers: state,
    }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch: dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);