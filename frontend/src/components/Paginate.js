import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { MemoryRouter, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "../material-styles/styles";
const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  const classes = useStyles();
  return (
    pages > 1 && (
      <>
        <Container>
          <Route>
            {({ location }) => {
              return (
                <Pagination
                  className={classes.paginateColor}
                  page={page}
                  count={pages}
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={
                        !isAdmin
                          ? keyword
                            ? `/search/${keyword}/page/${item.page}}`
                            : `/page/${item.page}`
                          : `/admin/trips/${item.page}`
                      }
                      {...item}
                    />
                  )}
                />
              );
            }}
          </Route>
        </Container>
      </>
    )
  );
};

export default Paginate;

/*  to={
                      keyword
                        ? `/search/${keyword}/page/${x + 1}}`
                        : `page/${x + 1}`
                    } */
