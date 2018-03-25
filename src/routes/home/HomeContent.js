import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { connect } from 'preact-redux';

import main, { init } from './logic/mainLogic.js';
import render from './logic/renderLogic.js';

// components
import GlobalMap from '../../components/GlobalMap/GlobalMap';
import Player from '../../components/Player/Player';

class HomeContent extends Component {
    static propTypes = {

    }

    constructor(props){
        super(props);
    }

    componentDidMount(){
        // loop main logic here
        const self = this;
        const { dispatch, allReducers } = this.props;
        function loop(){
            main(self)
                .then(res => {
                    render(self);  
                    setTimeout(() => requestAnimationFrame(loop), 15);
                })
        }

        init({ dispatch, allReducers })
            .then(res => {
                render(self);
                setTimeout(requestAnimationFrame(loop), 215)
            })
    }

    render(){
        const { worldReducer, PlayerReducer } = this.props.allReducers;
        let { map:globalMap, system } = worldReducer;
        globalMap = Array.isArray(globalMap) && globalMap.length > 0 ? globalMap : null;
        const Players = Array.isArray(globalMap) && globalMap.length > 0 ? PlayerReducer : null;
        const style = {
            width: system.width,
            height: system.height,
            border: '1px solid black',
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
        }
        return(
            <div style={style}>
                <GlobalMap 
                    systemData={system}
                    data={globalMap}
                />
                {
                    Players && Players.map((pl, plIndex) => {
                        return <Player 
                            key={pl.key} id={pl.key}
                            index={pl.indexInPlayerReducers}
                        />
                    })
                }
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