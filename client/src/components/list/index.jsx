import React, { useEffect, useState } from 'react';
import { ListItem, makeStyles, Grid, Paper } from '@material-ui/core';
import axios from "axios";
import { scrabbleScore } from "../../logic"
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "10PX"
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 600,
  } 
}));


const List = props => {
  const [listValues, setListValues] = useState([]);
  const [definition, setDefinition] = useState([]);
  const classes = useStyles();
  const definitions = [];

  useEffect(() => {
    let list = [];
    axios.get("words.json")
      .then(response => {
        list = [... new Set(props.data.filter(dataPoint => response.data.includes(dataPoint)))];
        setListValues(list);
      })
      .catch(error => {
        console.log(error);
      })
  }, [props.data]);

  useEffect(() => {
    if (listValues) {
      listValues.map(dataPoint => {
        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${dataPoint}`)
          .then(response => {
            definitions.push({
              key: dataPoint,
              definition: response.data[0].meanings[0]?.definitions[0]?.definition
            });
            setDefinition(definitions);
          })
      })
    }
  }, [listValues]);

  return (
    <div className={`${classes.root}`}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          {listValues.length === 0 && <Skeleton />}
          {listValues.map(dataPoint => (
            <>
              <ListItem key={dataPoint}>
                {dataPoint} - {scrabbleScore(dataPoint)} - {definition.filter(def => def.key === dataPoint)?.[0]?.definition}
              </ListItem>
            </>
          ))}
        </Grid>
      </Paper>
      
    </div>
  );
}

export default List;
