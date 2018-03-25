function render(component){
    const { dispatch, allReducers } = component.props;
    // console.log('render', component);
    let actions = {};
    Object.keys(allReducers).forEach(key => {
        actions[key] = allReducers[key];
    });
    // console.log(actions);
    dispatch({ type: 'RENDER_ALL', ...actions});

}

export default render;