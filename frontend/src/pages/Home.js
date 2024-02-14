import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, MenuItem, Select, FormControl } from "@material-ui/core";
import Trip from "../components/Trip";
import { listTrips } from "../actions/tripActions";
import { listCategories } from "../actions/categoryActions";
import Loader from "../components/Home/Loader";
import Paginate from "../components/Paginate";
const Home = ({ match }) => {
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const handleKeywordChange = (event) => {
    setSelectedKeyword(event.target.value);
  };

  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const tripList = useSelector((state) => state.tripList);
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, trips, pages, page } = tripList;
  const { categories } = categoryList;

  useEffect(() => {
    dispatch(listTrips(selectedKeyword, pageNumber));
    dispatch(listCategories());
  }, [dispatch, selectedKeyword, pageNumber]);
  return (
    <>
      <h1>Latest trips</h1>
      {categories?.length > 0 ? (
        <FormControl style={{ margin: "20px", width: "max-content" }}>
          <Select
            labelId="keyword-select-label"
            id="keyword-select"
            value={selectedKeyword}
            onChange={handleKeywordChange}
          >
            {categories.map((category) => {
              return <MenuItem value={category}>{category}</MenuItem>;
            })}
          </Select>
        </FormControl>
      ) : (
        <p>No trips available.</p>
      )}
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <Grid container spacing={4}>
            {trips.map((trip) => {
              return (
                <Grid key={trip._id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                  <Trip trip={trip} />
                </Grid>
              );
            })}
          </Grid>
          <Paginate
            pages={pages}
            page={page}
            keyword={selectedKeyword ? selectedKeyword : ""}
          />
        </>
      )}
    </>
  );
};

export default Home;
