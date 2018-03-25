import { deepCloneObject } from '../shared/util';


function createPlayer(args){
    const {} = args;
    const player = {
        type: new (class PLAYER{ constructor(){}}),
        health: health || 4000,
        strength: strength || 30,
        attacks: {
            
        },
        visionRange: 2,
        indexInPlayerReducers: index || 0,
        renderComponent: {
            sprites: sprite || '',
            htmlcomponent: null,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: width || 40,
            height: height || 40,
        }
    };

    return player;
}


const PlayerState = [];

export function PlayerReducer(state = PlayerState, action){
    switch(action.type){
        case 'RENDER_ALL':
            state = deepCloneObject(action.PlayerReducer);
        break;
    }

    return state;
}
