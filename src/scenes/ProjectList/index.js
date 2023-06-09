import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import Layout from "@root/components/Layout";

import { logout } from "@root/store/auth";
import projectsApi from "@root/store/projectApi";
import milestonesApi from "@root/store/milestoneApi";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
  Box,
} from "@mui/material";
import SearchBar from "@root/components/SearchBar";
import { useNavigate } from "react-router-dom";

export default function ProjectList() {
  const projects = projectsApi.endpoints.list.useQuery();
  let filteredProjects = projects;

  const dispatch = useDispatch();
  function handleLogoutClick() {
    dispatch(logout());
  }

  function handleEditClick(project) {
    localStorage.setItem("currentProject", JSON.stringify(project));
  }

  function handleDeleteClick(projectId) {
    // projectsApi.endpointe.delete.useMutation(projectId);
  }

  const navigate = useNavigate();
  function handleAddProjectClick() {
    navigate("/projects-creation");
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

  const comp = filteredProjects.isLoading ? (
    <CircularProgress />
  ) : (
    <TableBody>
      {filteredProjects.data.map((project) => (
        <TableRow key={project.id}>
          <TableCell>{project.title}</TableCell>
          <TableCell>{project.description}</TableCell>
          <TableCell>{project.client}</TableCell>
          <TableCell>{project.priceInRubles}</TableCell>
          <TableCell>{project.estimateInDays / 5}</TableCell>
          <TableCell>
            {project.lastUpdatedAt.replace("T", " :: ").slice(0, -7)}
          </TableCell>
          <TableCell>
            <IconButton component={RouterLink} to={`/projects/${project.id}`}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDeleteClick(project.id)}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

  return (
    <Layout>
      <Box display={"flex"}>
        <SearchBar value={searchTerm} onChange={setSearchTerm}></SearchBar>
        <Button
          variant="outlined"
          size="small"
          color="success"
          onClick={handleAddProjectClick}
        >
          Add New Project
        </Button>
      </Box>
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
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {comp}
        </Table>
      </TableContainer>
    </Layout>
  );
}
