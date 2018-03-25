export const mapSymbol = {
    0: {
        isCollideAble: false,
        moveCost: 0,
        type: 'land',
    },
    1: {
        isCollideAble: true,
        moveCost: 0,
        type: 'wall'
    },
    1000: {
        isDoor: true,
    },
}

export default mapSymbol;