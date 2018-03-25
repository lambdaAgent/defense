import { combineReducers } from 'redux';

// reducers
import { PlayerReducer } from './PlayerReducer'
import { NPCReducer } from './NPCReducer';
import { deepCloneObject } from '../shared/util';

export let GLOBAL_MAP = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 1, 1, 1, 1, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
];

const initState = {
    type: new (class WORLD { constructor(){}}),
    timeString: new Date().toString(),
    system: {
        width: 400,
        height: 400,
        time: '',
        cell: {
            cellStyle:{
                width: 40,
                height: 40,
            }
        }
    },
    map: GLOBAL_MAP,
};

function worldReducer(state=initState, action){
    const { type } = action;
    let cloneState;

    switch(action.type){
        case 'update_time':
            state.timeString = new Date().toString();
            // console.log('after state', state);
        break;

        case 'RENDER_ALL':
            state = Object.assign({}, action.worldReducer);
        break;
    }

    return state;
}


export default combineReducers({
    worldReducer,
    PlayerReducer,
    NPCReducer
});
