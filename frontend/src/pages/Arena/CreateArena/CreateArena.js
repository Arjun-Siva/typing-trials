import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import StadiumRoundedIcon from '@mui/icons-material/StadiumRounded';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useCreateArena } from "../../../hooks/useCreateArena";

const theme = createTheme();

export default function CreateArena() {

  const { create, error, isLoading} = useCreateArena();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    await create(data.get("nickname"));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <StadiumRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create new Arena
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                  autoComplete="given-name"
                  name="nickname"
                  required
                  fullWidth
                  id="nickname"
                  label="Nickname"
                  autoFocus
                />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Create Arena
            </Button>
            {error && <Typography className="signUpError" variant="subtitle1">{error}</Typography>}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/arena/join">
                  Join an existing arena
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}