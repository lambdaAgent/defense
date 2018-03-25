import { h } from 'preact';
import PropTypes from 'prop-types';

const GlobalMap = ({systemData, data}) => {
    const rowStyle={
        display: 'flex',

    }

    const cellStyle = {
        width: systemData.cell.cellStyle.width,
        height: systemData.cell.cellStyle.height,
        border: '1px dashed grey',
    };

    return (
        <div>
            {
                data && data.map((row, rowIndex) => {
                    return (
                        <div 
                        style={rowStyle}
                        key={'row'+rowIndex}
                        id={'row'+rowIndex}
                        >
                            {
                                row.map((value, columnIndex) => {
                                    const id = `cell${rowIndex},${columnIndex}`;
                                    return (
                                    <div 
                                    id={id} key={id}
                                    style={cellStyle}>
                                        {value}
                                    </div>
                                    );
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default GlobalMap;