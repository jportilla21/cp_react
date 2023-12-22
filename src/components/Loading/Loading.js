import CircularProgress from '@mui/material/CircularProgress';

const CustomSpinner = ({ text }) => {
  return (
    <div className="custom-spinner">
      <CircularProgress />
      <p>{text}</p>
    </div>
  );
};

export default CustomSpinner;
