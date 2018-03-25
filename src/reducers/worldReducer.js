import { combineReducers } from 'redux';

// reducers
import { PlayerReducer } from './PlayerReducer'
import { NPCReducer } from './NPCReducer';
import { deepCloneObject } from '../shared/util';

export let GLOBAL_MAP = [];

const initState = {
    type: new (class WORLD { constructor(){}}),
    timeString: new Date().toString(),
    system: {
        width: '',
        height: '',
        time: '',
    },
    map: GLOBAL_MAP,
};

function worldReducer(state=initState, action){
    const { type } = action;
    let cloneState;

    switch(action.type){
        case 'update_time':
            state.timeString = new Date().toString();
            console.log('after state', state);
        break;

        case 'RENDER_ALL':
            state = deepCloneObject(action.worldReducer);
        break;
    }

    return state;
}


export default combineReducers({
    worldReducer,
    PlayerReducer,
    NPCReducer
});
