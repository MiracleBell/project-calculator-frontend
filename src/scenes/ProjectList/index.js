import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Layout from "@root/components/Layout";

import { logout } from "@root/store/auth";
import projectsApi from "@root/store/projectApi";

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
import SearchBar from "@root/components/SearchBar";

export default function ProjectList() {
  const projects = projectsApi.endpoints.list.useQuery(
    JSON.parse(localStorage.getItem("user"))
  );
  let filteredProjects = projects;

  const dispatch = useDispatch();
  function handleLogoutClick() {
    dispatch(logout());
  }

  useEffect(() => {
    if (projects.error !== undefined) {
      handleLogoutClick();
    }
    filteredProjects = projects;
    console.log(projects);
  }, [projects]);

  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (searchTerm === "") {
      filteredProjects = projects;
    } else {
      filteredProjects = projects.data.filter((project) => {
        return (
          project.title.toLowerCase().includes(searchTerm.toLowerCase) ||
          project.client.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    console.log(filteredProjects);
  }, [searchTerm]);

  const comp = projects.isLoading ? (
    <CircularProgress />
  ) : (
    <TableBody>
      {filteredProjects.data.map((project) => (
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
      <SearchBar value={searchTerm} onChange={setSearchTerm}></SearchBar>
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