
export function createAttack({name, animation}){
    const attack = {
        type: new (function Attack(){}()),
        name: name,
        renderComponent: {
            animation: animation
        }
    }
}

