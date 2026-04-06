import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function LoadingPage() {
  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    }}>
      
      <CircularProgress size={60} />

      <Typography mt={3} variant="h6">
        ✨ Please wait while your plan is being generated...
      </Typography>

    </div>
  );
}