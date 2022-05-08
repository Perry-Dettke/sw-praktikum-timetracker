import * as React from 'react';
import { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Box} from '@mui/material';
import Stack from '@mui/material/Stack';

import PersonDialog from '../dialogs/PersonDialog';

class Person extends Component {
    
    constructor(props) {
        super(props);

    this.state = {
        showBuchung: false
    };
    }

    //PersonDialog anzeigen
    showBuchungDialog = () => {
        this.setState({ showPerson: true}, () => {
            console.log(this.state.showPerson);
        });
    };

    //PersonDialog schließen
    closeBuchungDialog = () => {
        this.setState({ showPerson: false});
    };

    render() {

    return (
        <div></div>
    )
}}