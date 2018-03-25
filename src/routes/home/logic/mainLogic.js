import render from './renderLogic';

export function init(args){
    return new Promise(resolve => {
        const { dispatch, allReducers } = args;     
        let action = {};

        dispatch({ type: 'CREATE_PLAYER' });

        setTimeout(() => {
            const playersElem = document.querySelectorAll('.Players');
            console.log(playersElem);
            playersElem.forEach(playerElem => {
                dispatch({type: 'UPDATE_PLAYER_ELEMENT', elem: playerElem})
            });
            // find all players elem and update the reducer
            // find all NPC elem and update the reducer
        }, 100);
        resolve();
    });
}

 function main (component){
     const { dispatch, allReducers } = component.props;
    //  console.log('main', component);
    return new Promise((resolve, reject) => {
        let action = {};

        resolve();
    });
}

export default main;