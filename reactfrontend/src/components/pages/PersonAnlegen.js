import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from '@mui/icons-material/Save';
import { TextField, Button, CardContent } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import PersonBO from "../../api/PersonBO";
import CardActions from "@material-ui/core/CardActions";
import TimetrackerAPI from "../../api/TimetrackerAPI";

class CreatePerson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vor_name: "",
      nach_name: "",
      email:"",
      benutzer_name:"",
      google_user_id:"",
      loadingInProgress: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  addPerson(vor_name, nach_name, email, benutzer_name) {
    var person = new PersonBO();
    person.setVor_name(vor_name);
    person.setNach_name(nach_name);
    person.setEmail(email);
    person.setBenutzer_name(benutzer_name)
    person.setGoogle_user_id("");
    person.setLetzte_aenderung(1); // später über person_id

    var api = TimetrackerAPI.getAPI();

    api.addPerson(person).then((person) => {
      this.setState({
        person: person,
      });
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault(); //r: verhindert ein neuladen der seite bei unberechtigten aufruf der funktion
    this.addPerson(
        this.state.vor_name,
        this.state.nach_name,
        this.state.email,
        this.state.benutzer_name,
        this.state.google_user_id
    );
    alert("Die Person wurde erfolgreich angelegt!") //auf alle creates übertragen
    this.setState({
        vor_name: "",
        nach_name: "",
        email:"",
        google_user_id:"",
    });
  };
  render() {
    const { classes } = this.props;

    return (
      <center>
      <Card elevation={0} className={classes.paper}>
        <CardContent>
          <div><h2>Neue Person anlegen:</h2></div>
          <div>
            <TextField
              label="Vorname"
              variant="outlined"
              name="vor_name"
              size="small"
              value={this.state.vor_name}
              onChange={this.handleChange}
              autoComplete="off"
              //fullWidth={true} // this may override your custom with
              required
            />
          </div>
        </CardContent>

        <CardContent>
          <div>
            <TextField
              label="Nachname"
              variant="outlined"
              name="nach_name"
              size="small"
              value={this.state.nach_name}
              onChange={this.handleChange}
              autoComplete="off"
              // fullWidth={true} // this may override your custom with
              required
            />
          </div>
        </CardContent>

        <CardContent>
          <div>
            <TextField
              label="E-Mail"
              variant="outlined"
              name="email"
              size="small"
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete="off"
              // fullWidth={true} // this may override your custom with
              // required
            />
          </div>
        </CardContent>

        {/* <CardContent>
          <div>
            <TextField
              label="Google ID"
              variant="outlined"
              name="gId"
              size="small"
              value={this.state.gId}
              onChange={this.handleChange}
              autoComplete="off"
              // fullWidth={true} // this may override your custom with
              // required
            />
          </div>
        </CardContent> */}

        {/* <CardContent>
          <div>
          
            <TextField
              label="Geben Sie Ihre ID ein?"
              variant="outlined"
              name="last_change_id"
              size="small"
              value={this.state.last_change_id}
              onChange={this.handleChange}
              autoComplete="off"
              //fullWidth={true} // this may override your custom with

              //required
            </div>
        </CardContent> */}


        <CardActions style={{justifyContent: 'center'}}>
      
          <Button
          
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={this.handleSubmit}
          >
            Bestätigen
            
          </Button>
          
        </CardActions>
      </Card>
      </center>
    );
  }
}
const styles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "35ch",
    },
    roott: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(1),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  },
});

export default withStyles(styles)(CreatePerson);