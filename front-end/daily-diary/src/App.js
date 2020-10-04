import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { CardHeader } from "@material-ui/core";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  allCards: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [diaries, setDiaries] = useState([]);
  const [lastDate, setLastDate] = useState(Date());
  const [newName, setNewName] = useState("");
  const [newText, setNewText] = useState("");

  const handleNewNameChanged = (e) => {
    setNewName(e.target.value);
  };

  const handleNewTextChanged = (e) => {
    setNewText(e.target.value);
  };

  const fetchDiaries = () => {
    axios.get(`http://localhost:9000/diaries`).then((res) => {
      const fetchedDiaries = res.data;
      console.log(fetchedDiaries);
      setDiaries(fetchedDiaries);
    });
  };

  const updateDiary = (newDiary) => {
    axios.post(`http://localhost:9000/diary`, { newDiary }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  const handleSubmit = async (e) => {
    const diffTime = Math.abs(lastDate - new Date());
    const newDiary = {
      name: newName,
      date: new Date(),
      text: newText,
      color:
        "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
    };
    await updateDiary(newDiary);
    setNewName("");
    setNewText("");
    fetchDiaries();
  };

  useEffect(() => {
    fetchDiaries();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Daily Diary
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <div className={classes.allCards}>
        {diaries.map((diary) => (
          <Card style={{ margin: "0.5rem", maxWidth: "15rem" }}>
            <div style={{ height: "2rem", backgroundColor: diary.color }} />
            <CardContent>
              <Typography className={classes.title} color="text">
                {diary.name}
              </Typography>
              <Typography variant="body2" color="textPrimary">
                {new Date(diary.date).toLocaleDateString("en-US")}
              </Typography>
              <br />
              <Typography variant="body1" component="p">
                {diary.text}
              </Typography>
            </CardContent>
          </Card>
        ))}
        <Card
          style={{
            margin: "0.5rem",
            maxHeight: "15rem",
            backgroundColor: "#000000",
          }}
        >
          <CardHeader
            title="New Diary"
            style={{ paddingBottom: "0", marginBottom: "0", color: "white" }}
          />
          <CardContent style={{ paddingTop: "0" }}>
            <Typography variant="body1" style={{ color: "white" }}>
              name ({newName.length} / 10)
            </Typography>
            <TextField
              value={newName}
              variant="outlined"
              size="small"
              onChange={handleNewNameChanged}
              style={{ backgroundColor: "white" }}
              inputProps={{ maxLength: 10 }}
            />
            <Typography variant="body1" style={{ color: "white" }}>
              text ({newText.length} / 30)
            </Typography>
            <TextField
              value={newText}
              variant="outlined"
              size="small"
              onChange={handleNewTextChanged}
              style={{ backgroundColor: "white" }}
              inputProps={{ maxLength: 30 }}
            />
            <div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: "1rem" }}
                onClick={handleSubmit}
              >
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
