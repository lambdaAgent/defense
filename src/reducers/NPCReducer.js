import { deepCloneObject } from '../shared/util';
import { createAttack } from './attackReducer';

function createNPC({name, guild, sprite, health, strength, width, height, index}){
    const npc = {
        type: new (function NPC(){})(),
        name: '',
        guild: '',
        health: health || 1000,
        strength: strength || 20,
        attacks: {
            // attacks || createAttack(),
        },
        visionRange: 2,
        indexInNPCreducers: index || 0,
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
    
    return npc
}

const NPCState = [];

export function NPCReducer(state = NPCState, action){
    switch(action.type){
        case 'RENDER_ALL':
            state = deepCloneObject(action.NPCReducer);
        break;
    }

    return state;
}
