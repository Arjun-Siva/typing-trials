import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const PlayerTable = ({ players }) => {
    const columns = [
        { field: 'nickname', headerName: 'Player', flex: 1, sortable: false, filterable: false },
        { field: 'speed', headerName: 'Speed (WPM)', type: 'number', flex: 1, filterable: false, sortable: false },
        { field: 'accuracy', headerName: 'Accuracy %', type: 'number', flex: 1, filterable: false, sortable: false },
    ];

    return (
        <div style={{ height: 300, width: '75%'}}>
            <DataGrid
                rows={players}
                columns={columns}
                pageSize={false}
                disableMultipleColumnsSorting={false}
                hideFooter={true}
                sortModel={[{ field: 'speed', sort: 'desc' }, { field: 'accuracy', sort: 'desc' }]}
                getRowId={(row) => row.temp_id} />
        </div>
    );
};

export default PlayerTable;
