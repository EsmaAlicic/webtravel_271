import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import useStyles from "../material-styles/styles.js";
const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const classes = useStyles();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
      setKeyword("");
    } else {
      history.push("/");
    }
  };
  return (
    <>
      <form className={classes.form} onSubmit={submitHandler} inline>
        <TextField
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          size="small"
          variant="outlined"
          InputProps={{
            className: classes.headerSearch,
          }}
        ></TextField>
        <Button type="submit" variant="contained">
          Search
        </Button>
      </form>
    </>
  );
};

export default SearchBar;
