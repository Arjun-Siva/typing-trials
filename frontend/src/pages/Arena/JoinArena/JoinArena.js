import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import StadiumRoundedIcon from '@mui/icons-material/StadiumRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useJoinArena } from '../../../hooks/useJoinArena';
import './JoinArena.css'

const theme = createTheme();

export default function Login() {

  const { join, error, isLoading } = useJoinArena();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await join(data.get('nickname'), data.get('arena_id'));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <StadiumRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Join Arena
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nickname"
              label="Nickname"
              name="nickname"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="arena_id"
              label="Arena ID"
              type="text"
              id="arena_id"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Enter Arena
            </Button>
            {error && <Typography className="loginError" variant="subtitle1">{error}</Typography>}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/arena/create">
                  {"Create new Arena"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}