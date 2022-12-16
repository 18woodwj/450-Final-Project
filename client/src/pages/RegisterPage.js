import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { register } from '../fetcher'
import { useHistory } from 'react-router-dom';





const theme = createTheme();

export default function Register() {
  const history = useHistory();
  const [region, setRegion] = React.useState('');
  const handleChange = (event) => {
    setRegion(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      region: region
    });
    // data populated from the form here, send to backend
    register(data.get('email'), region).then(res => {
      if (res.error) {
        console.log(res.error)
      } else {
        if (res.message) {
          console.log(res.message);
        } else {
          console.log("Account created!");
          // redirect to songs page here
          history.push('/songs')

        }
    
      }
      
    })
    

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
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />

            <Select
              margin="normal"
              required
              fullWidth
              id="region"
              value={region}
              label="Region"
              name="region"
              onChange={handleChange}
            >
              <MenuItem value={"Argentina"}>Argentina</MenuItem>
              <MenuItem value={"Egypt"}>Egypt</MenuItem>
              <MenuItem value={"Belgium"}>Belgium</MenuItem>
              <MenuItem value={"Canada"}>Canada</MenuItem>
              <MenuItem value={"Columbia"}>Columbia</MenuItem>
              <MenuItem value={"Czech Republic"}>Czech Republic</MenuItem>
              <MenuItem value={"Denmark"}>Denmark</MenuItem>
              <MenuItem value={"Ecuador"}>Ecuador</MenuItem>
              <MenuItem value={"Finland"}>Finland</MenuItem>
              <MenuItem value={"France"}>France</MenuItem>
              <MenuItem value={"Germany"}>Germany</MenuItem>
              <MenuItem value={"Ireland"}>Ireland</MenuItem>
              <MenuItem value={"Greece"}>Greece</MenuItem>
              <MenuItem value={"Guatemala"}>Guatemala</MenuItem>
              <MenuItem value={"Hong Kong"}>Hong Kong</MenuItem>
              <MenuItem value={"Hungary"}>Hungary</MenuItem>
              <MenuItem value={"Indonesia"}>Indonesia</MenuItem>
            </Select>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}