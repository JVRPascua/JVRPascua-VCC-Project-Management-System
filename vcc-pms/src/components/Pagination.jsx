import React, { useCallback } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../actions/projects";
import { FETCH_ALL, END_LOADING } from "../constants/actionTypes";

import useStyles from "./styles";

function Query() {
 return new URLSearchParams(useLocation().search);
}

const updateQueryString = (key, value) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(key, value);
  if (!searchParams.has("page")) {
    searchParams.set("page", 1);
  }
  const newUrl = window.location.pathname + "?" + searchParams.toString();
  window.history.pushState({ path: newUrl }, "", newUrl);
};

const Paginate = () => {
    const query = Query();
    const page = query.get('page') || 1;
    const { numberOfPages } = useSelector((state) => state.projects)
    const user = JSON.parse(localStorage.getItem('profile'));
    let userId = (process.env.USER_ID || user?.result?.rows[0]?.users_id) ?? null;
    userId = Number.isInteger(parseInt(userId)) ? parseInt(userId) : null;
    const classes = useStyles();
    const dispatch = useDispatch();
    const isPage = page > 0;

    const memoizedUpdateQueryString = useCallback(updateQueryString, []);

    React.useEffect(() => {
        if (userId) {
          dispatch(getProjects(page, userId));
          memoizedUpdateQueryString('userId', userId);
        }
      }, [page, userId, dispatch, memoizedUpdateQueryString]);

    const getProjectsQuery = useQuery(
        ["projects", page, userId],
        () => {
            if (isPage && userId) {
                return dispatch(getProjects(page, userId));
            }
        },
        {
            onSuccess: (data) => {
                dispatch({ type: FETCH_ALL, payload: data });
                dispatch({ type: END_LOADING });
            },
            onError: (error) => {
                console.log(error);
            },
        }
    );

    return (
        <Pagination 
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outline"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component="a" href={`?page=${item.page}&userId=${userId}`} onClick={(e) => { e.preventDefault(); memoizedUpdateQueryString('page', item.page) }} />
            )}
        />
    )
}

export default Paginate;
