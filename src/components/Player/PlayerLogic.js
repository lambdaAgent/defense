import {mapSymbol} from '../../shared/MapSymbolMatcher';

export function getTerrainInfo({speed, playerElem, direction, document, globalMap}){
    let { x,y,width, height } = playerElem.getBoundingClientRect();
    let triPoints = [[],[],[]];
    if(direction === 'right'){ 
        // adjust the coordinate by 1points
        triPoints[0] = [x + (width+speed), y+5]; //topright
        triPoints[1] = [x + (width+speed), y + (height/2)]; // midRight
        triPoints[2] = [x + (width+speed), y+height-5]; //bottomRight       
    }
    else if(direction === 'left') {
        triPoints[0] = [x - speed, y+5]; //topleft
        triPoints[1] = [x - speed, y + (height/2)]; // midleft
        triPoints[2] = [x - speed, y+height-5]; //bottomleft
    }
    else if(direction === 'top') {
        triPoints[0] = [x+5 , y - speed]; //topleft
        triPoints[1] = [x + (width/2), y - speed]; // midtop
        triPoints[2] = [x-5 + width,  y - speed]; //righttop
    }
    else if(direction === 'down') {
        triPoints[0] = [x+5 , y+height + speed]; //bottomleft
        triPoints[1] = [x + (width/2), y+height + speed]; // bottommid
        triPoints[2] = [x-5 + width,  y+height + speed]; //bottomright
    }
    let result  = triPoints.map(point => document
                    .elementsFromPoint(point[0], point[1])
                    .filter(elem => elem.id.startsWith('cell'))[0]
                );
    const isSomeUndefined = result.some(elem => !elem);

    if(isSomeUndefined){
        return {};
    }                
   
    result = result.map(elem => {
        if(!elem) return;
        const [tableRow, tableColumn] = elem.id.split('cell')[1].split(',');
        const value = globalMap[tableRow][tableColumn];
        const terrainInfo = mapSymbol[value]; 
        return terrainInfo;
    });
    const isNextMoveAllowed = result.every(terrainInfo => !terrainInfo.isCollideAble);

    return isNextMoveAllowed ? result[1] : null;
}

export function calculateNextSpeed({speed, playerElem, document,globalMap}){
    let result = ['top', 'right', 'down','left'].map(direction => {
        const terrainInfo = getTerrainInfo({speed, playerElem, direction, document,globalMap});
        if(!terrainInfo) return 0;
        const {isCollideAble, moveCost} = terrainInfo;
        if(isCollideAble) return 0;
        const calculatedSpeed = speed - moveCost;
        return calculatedSpeed;
    });
    const [ top, right, down, left ] = result.map(num => !isNaN(num) ? num : 0);
    
    return {top, right, down, left};
}
