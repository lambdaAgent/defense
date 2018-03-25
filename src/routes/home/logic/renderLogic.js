function render({dispatch, allReducers}){
    let actions = {};
    Object.keys(allReducers).forEach(key => {
        actions[key] = allReducers[key];
    })
    dispatch({ type: 'RENDER_ALL', ...actions});

}

export default render;