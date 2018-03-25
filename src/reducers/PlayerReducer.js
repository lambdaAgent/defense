import { deepCloneObject } from '../shared/util';


function createPlayer(args){
    // const = args;
    let health, strength, sprite, width, height, name; // not required
    const { index } = args; // required
    const player = {
        key: `Player${index}`,
        name: name || `Player${index}`,
        type: new (class PLAYER{ constructor(){}}),
        health: health || 4000,
        strength: strength || 30,
        speed: 2,
        attacks: {
            
        },
        visionRange: 2,
        indexInPlayerReducers: index || 0,
        renderComponent: {
            sprites: sprite || '',
            htmlcomponent: null,
            top: 79,
            bottom: 0,
            left: 60.796875,
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
             state = state.slice();
            // console.log('RENDER ALL PLAYERS', state);
        break;

        case 'CREATE_PLAYER':
            (function(){
                let args = {};
                Object.keys(action).forEach(key => { args[key] = action[key]});
                args.index = PlayerState.length;
                const _player = createPlayer(args);
                // console.log('creatPlayer', args, _player)
                state = state.concat([_player]);
            }())
        break;

        case 'UPDATE_POSITION':
            (function(){
                const { index, renderComponent } = action;
                state[index].renderComponent = renderComponent;
            }())
        break;

        // action { type::String, elem: Element } 
        case 'UPDATE_PLAYER_ELEMENT':
            const { id } = action.elem;
            const index = id.split('Player')[1];
            state[index].renderComponent.htmlcomponent = action.elem;
        break;
    }

    return state;
}
