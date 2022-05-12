// import React, { Component } from 'react';
// import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import TextField from '@material-ui/core/TextField';
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import { MenuItem } from '@mui/material';
// import ProjektBO  from '../../api/PersonBO';
// import TimetrackerAPI from '../../api/TimetrackerAPI';




// class ProjektDialog extends Component {

//     constructor(props) {
//         super(props);

//         let be = '', pl = '', ag = '', pe = '', ak = '';
//         if (props.projekt) {
//           be = props.projekt.getBezeichnung();
//           pl = props.projekt.getProjektleiter();
//           ag = props.projekt.getAuftraggeber();
//           pe = props.projekt.getPerson();
//           ak = props.projekt.getAktivitaet();
//         }
    
        
//     this.state = {
//         bezeichnung: be,
//         projektleiter: pl,
//         auftraggeber: ag,
//         person: pe,
//         aktivitaet: ak,
//       };
//       // state als Fallback speichern
//       this.initialState = this.state;
//     }

//   // Projekt neu anlegen
//   addProjekt = () => {
//     let newProjekt = new ProjektBO(this.state.projektname, this.state.projektleiter, this.state.auftraggeber, this.state.person, this.state.aktivitaet)
//     TimetrackerAPI.getAPI().addProjekt(newProjekt).then(projekt => {
//       this.setState(this.initialState);
//       this.props.onClose(projekt);
//     })
//   }
  
//     // Dialog schließen
//     handleClose = () => {
//         this.setState(this.initialState);
//         this.props.onClose();

//         handleChange(e) {
//             this.setState({ [e.target.name]: e.target.value });
//           }



//     // }
//     }
//     render() {
//         const { show } = this.props
//         const {projektname, projektleiter, auftraggeber, person, aktivitaet } = this.state;

//         return (
//             show ?
//                 <div>
//                     <Dialog open={show} onClose={this.handleClose} maxWidth='xl'>
//                         <DialogTitle id='form-dialog-title'>Neues Projekt
//                             <IconButton onClick={this.handleClose}>
//                                 <CloseIcon />
//                             </IconButton>
//                         </DialogTitle>
//                         <DialogContent>
//                             <DialogContentText>
//                                 <div>
//                                 <TextField autoFocus type='text' required fullWidth margin='normal' id='projektname' label='Projektname:' value={projektname} onChange={this.textFieldValueChange} />
//                                 </div>
//                                 {/* <div>
//                                 <FormControl fullWidth>
//                                 <InputLabel id="projektleiter">Projektleiter</InputLabel>
//                                  <Select
//                                     labelId="projektleiter"
//                                     id="projektleiter"
//                                     // value={projektleiter}
//                                     label="Projektleiter"
//                                     onChange={this.handleChange}
//                                  >
//                                     <MenuItem value={1}>Projektleiter 1</MenuItem>
//                                     <MenuItem value={2}>Projektleiter 2</MenuItem>
//                                     <MenuItem value={3}>Projektleiter 3</MenuItem>
//                                 </Select>
//                                 </FormControl>
//                                 </div>
//                                 <div><TextField
//                                                 label="Auftraggeber"
//                                                 variant="outlined"
//                                                 name="name"
//                                                 size="small"
//                                                 // value={this.state.name}
//                                                 onChange={this.handleChange}
//                                                 autocomplete='off'

//                                 ></TextField>
//                                 </div>
                              
//                             <FormControl fullWidth>
//                             <InputLabel id="person">Person</InputLabel>
//                             <Select
//                                 labelId="person"
//                                 id="person"
//                                 // value={person}
//                                 label="Person"
//                                 onChange={this.handleChange}
//                             >
//                                 <MenuItem value={1}>Person 1</MenuItem>
//                                 <MenuItem value={2}>Person 2</MenuItem>
//                                 <MenuItem value={3}>Person 3</MenuItem>
//                             </Select>
//                             </FormControl>

//                             <FormControl fullWidth>
//                             <InputLabel id="soll_Stunden">Soll Stunden</InputLabel>
//                             <Select
//                                 labelId="soll_stunden"
//                                 id="soll_stunden"
//                                 // value={soll_stunden}
//                                 label="Soll Stunden"
//                                 onChange={this.handleChange}
//                             >
//                                 <MenuItem value={1}>1 Stunde</MenuItem>
//                                 <MenuItem value={2}>2 Stunden</MenuItem>
//                                 <MenuItem value={3}>3 Stunden</MenuItem>
//                             </Select>
//                             </FormControl>
                            
//                             <TextField
//                                         label="Aktivität"
//                                         variant="outlined"
//                                         name="name"
//                                         size="small"
//                                         // value={this.state.name}
//                                         onChange={this.handleChange}
//                                         autocomplete='off'
//                             ></TextField>

//                             <FormControl fullWidth>
//                             <InputLabel id="soll_Stunden">Soll Stunden</InputLabel>
//                             <Select
//                                 labelId="soll_stunden"
//                                 id="soll_stunden"
//                                 // value={soll_stunden}
//                                 label="Soll Stunden"
//                                 onChange={this.handleChange}
//                             >
//                                 <MenuItem value={1}>1 Stunde</MenuItem>
//                                 <MenuItem value={2}>2 Stunden</MenuItem>
//                                 <MenuItem value={3}>3 Stunden</MenuItem>
//                             </Select>
//                             </FormControl> */}
                        


                  
//                             </DialogContentText>
//                         </DialogContent>
//                         <DialogActions>
//                             <Button color='secondary' onClick={this.handleClose}>
//                                 Abbrechen
//                             </Button>
//                             <Button variant='contained' color='primary'>
//                                 Bestätigen
//                             </Button>
//                         </DialogActions>
//                     </Dialog></div>
//                 : null
//         );
//     }
// }


// export default ProjektDialog;
