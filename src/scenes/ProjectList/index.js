import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import Layout from "@root/components/Layout";

import { logout } from "@root/store/auth";
import projectsApi from "@root/store/projectApi";
import { getProjects } from "@root/store/projectApi";

import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";

export default function ProjectList() {
  const projects = projectsApi.endpoints.list.useQuery(
    JSON.parse(localStorage.getItem("user"))
  );
  const dispatch = useDispatch();
  console.log(projects);
  function handleLogoutClick() {
    dispatch(logout());
  }

  useEffect(() => {
    if (projects.error !== undefined) {
      handleLogoutClick();
    }
    console.log(projects);
  }, [projects]);

  const comp = projects.isLoading ? (
    <CircularProgress />
  ) : (
    <TableBody>
      {projects.data.map((project) => (
        <TableRow key={project.id}>
          <TableCell>{project.title}</TableCell>
          <TableCell>{project.description}</TableCell>
          <TableCell>{project.client}</TableCell>
          <TableCell>{project.deadline}</TableCell>
          <TableCell>{project.time}</TableCell>
          <TableCell>{project.lastDateUpdate}</TableCell>
          <TableCell>
            <IconButton>
              <EditIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  return (
    <Layout>
      <Button onClick={handleLogoutClick}>logout</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Weeks</TableCell>
              <TableCell>Budjet</TableCell>
              <TableCell>Last Date Update</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {comp}
        </Table>
      </TableContainer>
    </Layout>
  );
}
