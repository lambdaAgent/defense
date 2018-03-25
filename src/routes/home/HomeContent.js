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
        let { map:globalMap, system } = worldReducer;
        globalMap = Array.isArray(globalMap) && globalMap.length > 0 ? globalMap : null;
        console.log(globalMap);
        const style = {
            width: system.width,
            height: system.height,
            border: '1px solid black',
            display: 'flex',
            flexDirection: 'column',
        }
        const rowStyle={
            display: 'flex',
        }

        const cellStyle = {
            width: system.cell.cellStyle.width,
            height: system.cell.cellStyle.height,
            border: '1px dashed grey'
        }
        return(
            <div style={style}>
              {
                globalMap && globalMap.map((row, rowIndex) => {
                    return (
                        <div 
                        style={rowStyle}
                          key={'row'+rowIndex}
                          id={'row'+rowIndex}
                        >
                            {
                                row.map((value, columnIndex) => {
                                    const id = `cell${rowIndex},${columnIndex}`;
                                    return (
                                      <div 
                                      id={id} key={id}
                                      style={cellStyle}>
                                          {value}
                                      </div>
                                    );
                                  })
                            }
                        </div>
                    )
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