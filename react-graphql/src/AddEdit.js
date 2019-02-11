import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
class AddEdit extends Component {
    render() {
        return (
                <div className="container">
                    <Grid container spacing={24}>
                        <Grid item md={12} xs={12} >
                            <TextField
                                id="outlined-dense"
                                label="Book Title"
                                margin="dense"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12} >
                            <TextField
                                id="outlined-dense"
                                label="Author Name"
                                margin="dense"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </div>
        );
    }
}

export default AddEdit;
