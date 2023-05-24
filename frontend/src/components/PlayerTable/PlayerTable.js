import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const PlayerTable = ({ players }) => {
    const columns = [
        { field: 'nickname', headerName: 'Player', flex: 1, sortable: false, filterable: false, width: 160 },
        { field: 'speed', headerName: 'Speed (WPM)', type: 'number', flex: 1, filterable: false, sortable: false, width: 130 },
        { field: 'accuracy', headerName: 'Accuracy %', type: 'number', flex: 1, filterable: false, sortable: false, width: 130 },
    ];

    return (
        <div style={{ height: 400, width: '75%'}}>
            <DataGrid
                rows={players}
                columns={columns}
                pagination={false}
                pageSize={false}
                disableMultipleColumnsSorting={false}
                hideFooter={true}
                sortModel={[{ field: 'speed', sort: 'desc' }, { field: 'accuracy', sort: 'desc' }]}
                getRowId={(row) => row.temp_id} />
        </div>
    );
};

export default PlayerTable;
