import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { DataGrid } from '@mui/x-data-grid';
import formatDistanceToNow from "date-fns/formatDistanceToNow"

const columns = [
    { field: 'speed', headerName: 'Speed (WPM)', width: 130 },
    { field: 'accuracy', headerName: 'Accuracy %', width: 130 },
    {
        field: 'createdAt',
        headerName: 'Logged on',
        width: 160,
        sortable: false,
        valueGetter: (params) => 
            formatDistanceToNow(new Date(params.row.createdAt), {addSuffix: true})
    }
]; 


const Profile = () => {
    const [scores, setScores] = useState(null);

    const { user } = useAuthContext();

    useEffect(() => {
        const fetchScores = async () => {
            const response = await fetch(process.env.REACT_APP_SCORES_API, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            setScores(json);
            console.log(json);
        }

        if (user) {
            fetchScores();
        }

    }, [/*dispatch,*/ user]);

    return (
        <div>
            <h1>History</h1>
            <div style={{ height: 400, width: '100%' }}>
                {scores && 
                <DataGrid
                    rows={scores}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    getRowId={(row) => row._id}
                />
                }
            </div>
        </div>
    )
}

export default Profile;