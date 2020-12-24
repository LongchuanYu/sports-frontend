import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(()=>({
    root: {
        margin: "16px"
    }
}))

export default function Training(){
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div className={classes.root}>
            <Card>
                
                <CardContent>12313131</CardContent>
            </Card>
        </div>
    )
}