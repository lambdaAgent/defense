import deepForceUpdate from 'preact-deep-force-update';


 function main (args){
    return new Promise((resolve, reject) => {
        const { dispatch, allReducers } = args;
        let action = {};
        dispatch({type: 'update_time'});
        resolve();
    });
}

export default main;