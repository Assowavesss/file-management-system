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
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [allFiles, setAllFiles] = useState<string[]>([]);
  const [showAllFiles, setShowAllFiles] = useState<boolean>(false);
  const [documentType1Files, setDocumentType1Files] = useState<string[]>([]);
  const [documentType2Files, setDocumentType2Files] = useState<string[]>([]);

  useEffect(() => {
    // Charger la liste des fichiers téléchargés au chargement de la page
    loadUploadedFiles();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    console.log('Selected file:', selectedFile); // Affichez le fichier sélectionné
    setFile(selectedFile); // Prendre le premier fichier
  };

  const handleDocumentTypeChange = (e: SelectChangeEvent<string>) => {
    setDocumentType(e.target.value as string); // Mettre à jour le documentType
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file || !documentType) {
      setSnackbarMessage('Please select a file and specify the document type.');
      setOpenSnackbar(true);
      return;
    }
    console.log('Uploading file:', file.name);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    console.log('File in FormData:', formData.get('file')); // Vérifiez le fichier dans FormData
    console.log('Document Type in FormData:', formData.get('documentType')); // Ajouter le type de document

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/upload',
        formData
      );
      console.log(response.data);
      setSnackbarMessage('File uploaded successfully!');
      setOpenSnackbar(true);
      // Rechargez la liste des fichiers téléchargés après le téléchargement
      loadUploadedFiles();
    } catch (error: any) {
      console.error('Error during file upload:', error);
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : 'Failed to upload file.';
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

  const loadUploadedFiles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/allfiles');
      console.log('Response from loadUploadedFiles:', response.data);
      // Puisque la réponse est déjà un tableau de chaînes (noms de fichiers), vous pouvez le définir directement
      setUploadedFiles(response.data);
      // Séparez les fichiers par document type
      const type1Files = response.data.filter((fileName: string) =>
        fileName.includes('CahierDesCharges')
      );
      const type2Files = response.data.filter((fileName: string) =>
        fileName.includes('RapportDeStage')
      );
      setDocumentType1Files(type1Files);
      setDocumentType2Files(type2Files);
    } catch (error: any) {
      console.error('Error loading uploaded files:', error);
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
      saveAs(response.data, fileName);
    } catch (error: any) {
      console.error('Error during file download:', error);
      // Affichez un message d'erreur ou gérez l'erreur comme vous le souhaitez
    }
  };

  const handleShowAllFiles = () => {
    setShowAllFiles(!showAllFiles);
    if (!showAllFiles) {
      loadAllFiles();
    }
  };

  const loadAllFiles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/allfiles');
      setAllFiles(
        response.data.map((file: { fileName: string }) => file.fileName)
      ); // Utilisez le nom d'origine
    } catch (error: any) {
      console.error('Error loading all files:', error);
    }
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
                <input type="file" onChange={handleFileChange} />
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
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          List of Uploaded Files:
        </Typography>
        {uploadedFiles.map((fileName, index) => (
          <Paper
            key={index}
            variant="outlined"
            style={{ marginTop: '10px', padding: '10px' }}
          >
            <Grid container alignItems="center">
              <Grid item xs={8}>
                <Typography variant="body1">{fileName}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleDownload(fileName)}
                >
                  Download
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ))}
        <Typography variant="h6" style={{ marginTop: '20px' }}>
          List of All Files:
        </Typography>
        <List>
          {allFiles.map((fileName, index) => (
            <ListItem key={index}>
              <ListItemText primary={fileName} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="Download"
                  onClick={() => handleDownload(fileName)}
                >
                  <i className="fa fa-download" />
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
          sx={{ mt: 2 }}
        >
          {showAllFiles ? 'Hide All Files' : 'Show All Files'}
        </Button>
        {showAllFiles && (
          <>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography variant="h6">Separated by Document Type:</Typography>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Document Type 1 Files:
            </Typography>
            <List>
              {documentType1Files.map((fileName, index) => (
                <ListItem key={index}>
                  <ListItemText primary={fileName} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="Download"
                      onClick={() => handleDownload(fileName)}
                    >
                      <i className="fa fa-download" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Document Type 2 Files:
            </Typography>
            <List>
              {documentType2Files.map((fileName, index) => (
                <ListItem key={index}>
                  <ListItemText primary={fileName} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="Download"
                      onClick={() => handleDownload(fileName)}
                    >
                      <i className="fa fa-download" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}
