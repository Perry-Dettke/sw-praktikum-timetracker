import React, { Component } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@material-ui/core/TextField';
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MenuItem } from '@mui/material';
import { TableCell } from '@material-ui/core';
import TimetrackerAPI from "../../api/TimetrackerAPI";
import ProjektBO from '../../api/ProjektBO'
import { EventBusyRounded } from '@mui/icons-material';
import AktivitaetBO from '../../api/AktivitaetBO';



class EreignisBuchung extends Component {



constructor(props) {
    super(props);

    let st = "", ak = "", ai;
    if (props.aktivitaet) {
        ak = props.aktivitaet.bezeichnung
    }
    if (props.buchung) {
        st = props.buchung.stunden
    }
    if (props.aktivitaet) {
        ai = props.buchung.aktivitaet_id
    }
    this.state = {
        stunden: st,
        bezeichnung: ak,
        aktivitaet_id: ai,
        aktivitaetID : 0,
      
    };

    this.initialState = this.state;
}










}
export default EreignisBuchung;
