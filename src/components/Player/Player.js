import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { connect } from 'preact-redux';

//logic
import { calculateNextSpeed } from './PlayerLogic';

const style = {
    top: 0, left: 0,
    width: 40,
    height: 40,
    backgroundColor: 'red',
    position: 'absolute'
};

class Player extends Component{
    static propTypes = {
        playerData: PropTypes.object,
        index: PropTypes.number,
        id: PropTypes.string
    }
    constructor(props){
        super(props);
        this.keypress = [];
    }

    componentDidMount(){

    }

    render(){
        const { id, index } = this.props;
        const { renderComponent } = this.props.allPlayers[index];
        const { top, left } = renderComponent;
        const playerStyle = Object.assign({}, style, {
            transform: `translateX(${left}px) translateY(${top}px) translateZ(0)`
        });
        return(
            <div 
                className='Players'
                tabIndex='0' id={id}
                onKeyDown={this.onKeyDown.bind(this)}
                onKeyUp={this.onKeyUp.bind(this)}
                onClick={e => console.log(e)}
                style={playerStyle}>   
                P
            </div>
        )
    }

    onKeyUp(e){
        this.keypress = this.keypress.length > 0 ? this.keypress.filter(key => key !== e.which) : [];
    }

    onKeyDown(e){
        const { dispatch, index, worldReducer } = this.props;
        const playerData = this.props.allPlayers[index];
        const { map:globalMap } = worldReducer;
        e.preventDefault(); e.stopPropagation();
        if(this.keypress.indexOf(e.which) < 0){
            this.keypress.unshift(e.which);
        }
        console.log(this.keypress)
        if(this.keypress.length > 2){
            this.keypress.pop();
        }
        console.log(this.keypress);
        const { right,left, top, down } = calculateNextSpeed({
            speed: playerData.speed,
            playerElem: playerData.renderComponent.htmlcomponent,
            document, globalMap
        });
        
        this.keypress.forEach(key => {
            switch(key){
                case 39: // right
                    playerData.renderComponent.left += right;
                break;

                case 40: // down
                    playerData.renderComponent.top += down;
                break;

                case 38: //up
                    playerData.renderComponent.top -= top;
                break;

                case 37: //left
                    playerData.renderComponent.left -= left;
                break;
            }
        });
        this.props.updatePosition(index, playerData.renderComponent);
    }
}

const mapStateToProps = ({PlayerReducer, worldReducer}) => {
    return {
        worldReducer,
        allPlayers: PlayerReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    updatePosition: (index, renderComponent) => {
        dispatch({ type: 'UPDATE_POSITION', index, renderComponent });
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Player);