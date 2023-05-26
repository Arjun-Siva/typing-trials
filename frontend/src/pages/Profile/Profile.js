import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { DataGrid } from '@mui/x-data-grid';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Typography } from "@mui/material";

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
        }

        if (user) {
            fetchScores();
        }

    }, [user]);

    return (
        <div>
            <Typography variant="h3">Hi, {user.username}</Typography>
            <br/>
            <Typography variant="h4">Saved results</Typography>
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