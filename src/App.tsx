import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import AddForm from "./components/form/AddForm";

const App = () => {
  return (
    <Box>
      <Paper
        sx={{
          maxWidth: "50%",
          ml: "auto",
          mr: "auto",
          mt: 4,
          p: 2,
        }}
      >
        <Typography
          variant='h6'
          fontWeight={600}
          sx={{
            textAlign: "center",
          }}
        >
          Forn Builder
        </Typography>
        <Typography
          variant='subtitle1'
          fontWeight={600}
          sx={{
            mt: 1,
          }}
        >
          In this code test you will develop a SPA (Single page application)
          with the following criteria
        </Typography>
        <Typography
          variant='body1'
          sx={{
            mt: 2,
          }}
        >
          A form builder containing a few common form items such as radio
          buttons, selects and inputs. Each form can contain sections of items
          and as a user I want to be able to edit, move, add and delete. The
          items doesn't have to be saved server side so feel free to use a state
          or state manager.
        </Typography>
        <Typography
          variant='body1'
          sx={{
            mt: 2,
          }}
        >
          The form should then be rendered and after being filled in add a
          submit button where you format the data in a reasonable way suited for
          a backend service but just print it in a console.log
        </Typography>
        <Typography
          sx={{
            mt: 2,
          }}
        >
          Use as much functionality as possible from material UI when it comes
          to design. If needed write some custom css yourself.
        </Typography>
        <Typography
          variant='h5'
          sx={{
            mt: 2,
          }}
        >
          Happy hacking!
        </Typography>
      </Paper>
      {/* <TextInput lable='input name' /> */}
      <div style={{ textAlign: "center", paddingTop: "30px" }}>
        <AddForm />
      </div>
    </Box>
  );
};

export default App;
