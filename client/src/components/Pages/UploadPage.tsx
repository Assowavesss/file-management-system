import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';
import {
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  IconButton,
  SelectChangeEvent,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showAllFiles, setShowAllFiles] = useState<boolean>(false);

  useEffect(() => {
    loadFiles();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleDocumentTypeChange = (e: SelectChangeEvent<string>) => {
    setDocumentType(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file || !documentType) {
      setSnackbarMessage('Please select a file and specify the document type.');
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);

    try {
      await axios.post('http://localhost:8080/api/v1/upload', formData);
      setSnackbarMessage('File uploaded successfully!');
      setOpenSnackbar(true);
      loadFiles();
    } catch (error) {
      let errorMessage = 'Failed to upload file.';

      if (axios.isAxiosError(error)) {
        const axiosError = error;

        if (axiosError.response && axiosError.response.data) {
          if (typeof axiosError.response.data === 'string') {
            errorMessage = axiosError.response.data;
          } else if (
            typeof axiosError.response.data === 'object' &&
            axiosError.response.data.message
          ) {
            errorMessage = axiosError.response.data.message;
          }
        }
      } else {
        if (error instanceof Error) {
          errorMessage = error.message;
        }
      }

      console.error('Error during file upload:', error);
      setSnackbarMessage(errorMessage);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const loadFiles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/allfiles'); // Utilisation de la bonne URL
      setUploadedFiles(response.data);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  };

  const handleDownload = async (fileName: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/download/${fileName}`,
        {
          responseType: 'blob',
        }
      );
      saveAs(response.data, fileName); // Utilisation de la bonne URL
    } catch (error) {
      console.error('Error during file download:', error);
    }
  };

  const handleShowAllFiles = () => {
    setShowAllFiles(!showAllFiles);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" style={{ paddingTop: '40px' }}>
        <Paper
          elevation={6}
          style={{ padding: '20px', border: '3px solid black' }}
        >
          <Typography
            component="h1"
            variant="h5"
            style={{ textAlign: 'center' }}
          >
            File Upload
          </Typography>
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            component="form"
            noValidate
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <input
                  accept="*/*"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: 'block', margin: '20px auto' }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="document-type-label">
                    Document Type
                  </InputLabel>
                  <Select
                    labelId="document-type-label"
                    id="documentType"
                    value={documentType}
                    label="Document Type"
                    onChange={handleDocumentTypeChange}
                  >
                    <MenuItem value="CahierDesCharges">
                      Cahier des Charges
                    </MenuItem>
                    <MenuItem value="RapportDeStage">Rapport de Stage</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: 2,
                  backgroundColor: '#CBB780FF',
                }}
              >
                Upload File
              </Button>
            </Grid>
          </Box>
        </Paper>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={
              snackbarMessage.startsWith('Failed') ? 'error' : 'success'
            }
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Typography
          variant="h6"
          style={{ marginTop: '20px', marginBottom: '10px' }}
        >
          List of Uploaded Files:
        </Typography>
        <List>
          {uploadedFiles.map((fileName, index) => (
            <ListItem key={index}>
              <ListItemText primary={fileName} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="download"
                  onClick={() => handleDownload(fileName)}
                >
                  <DownloadIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleShowAllFiles}
          sx={{ mt: 2, mb: 2 }}
        >
          {showAllFiles ? 'Hide All Files' : 'Show All Files'}
        </Button>
        {showAllFiles && (
          <>
            <Divider sx={{ my: 2 }} />
            {/* Assuming there is a separate list or some other content to show when 'showAllFiles' is true */}
            {/* Add that content here */}
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}
