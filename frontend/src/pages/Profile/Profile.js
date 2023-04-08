// import { useEffect } from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import formatDistanceToNow from "date-fns/formatDistanceToNow";
// import { useScoreContext } from "../../hooks/useScoreContext"
// import { useAuthContext } from "../../hooks/useAuthContext";

// export default function Profile() {
//   const { scores, dispatch } = useScoreContext();
//   const { user } = useAuthContext();

//   useEffect(()=>{
//     const fetchScores = async () => {
//         const response = await fetch('/api/scores', {
//             headers: {
//                 'Authorization': `Bearer ${user.token}`
//             }
//         })
//         console.log('fetched scores')
//         const json = await response.json()

//         if (response.ok){
//             dispatch({type: 'SET_SCORES', payload: json});
//         }
//     }

//     if (user) {
//         fetchScores();
//         console.log('scores', scores);
//     }

// }, [scores, user])

// //   const handleClick = async () => {
// //     if (!user) {
// //       return
// //     }
// //     const response = await fetch('/api/scores/' + score._id, {
// //       method: 'DELETE',
// //       headers: {
// //         'Authorization': `Bearer ${user.token}`
// //       }
// //     })
// //     const json = await response.json()

// //     if (response.ok) {
// //       dispatch({ type: 'DELETE_SCORE', payload: json })
// //     }
// //   }

//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Logged</TableCell>
//             <TableCell align="right">Speedt&nbsp;(WPM)</TableCell>
//             <TableCell align="right">Accuracy%</TableCell>
//             <TableCell align="right">Delete</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {scores.map((i, score) => (
//             <TableRow
//               key={i}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="score">
//                 {formatDistanceToNow(new Date(score.createdAt), {addSuffix: true})}
//               </TableCell>
//               <TableCell align="right">{score.speed}</TableCell>
//               <TableCell align="right">{score.accuracy}</TableCell>
//               <TableCell align="right">Delete button</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

const Profile = () => {
    return (
        <>
            <h1>Profile</h1>
        </>
    )
}

export default Profile;