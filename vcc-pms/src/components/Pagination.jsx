import React, {useEffect} from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../actions/projects";

import useStyles from "./styles";

function Query() {
 return new URLSearchParams(useLocation().search);
}

const Paginate = () => {
    const query = Query();
    const page = query.get('page') || 1;
    const { numberOfPages } = useSelector((state) => state.projects)
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?.rows[0]?.users_id;
    const classes = useStyles();
    const dispatch = useDispatch();
    const isPage = page > 0;
    
    useEffect(() => {
       if(page) dispatch(getProjects(page, userId));
   }, [dispatch, page, userId]);

//    const getProjectsQuery = useQuery({
//        queryKey: ["projects", {page, userId}],
//        enabled: isPage,
//        queryFn: dispatch(getProjects({page, userId})),
//    });

    return (
        <Pagination 
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outline"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/projects?page=${item.page}`} />
            )}
        />
    )
}

export default Paginate;