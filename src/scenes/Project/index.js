import React, { useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, CircularProgress, Grid, Tab, Typography } from "@mui/material";

import HorizontalLine from "@root/components/HorizontalLine";
import ProjectInfo from "@root/components/ProjectInfo";

import projectsApi from "@root/store/projectApi";
import MilestoneList from "@root/components/MilestoneList";
import TeamList from "@root/components/TeamList";
import FeatureList from "../../components/FeatureList";
import Layout from "../../components/Layout";

function getId() {
  const currentURL = window.location.href;
  let id = currentURL.substring(
    currentURL.lastIndexOf("/projects") + 10,
    currentURL.length
  );
  localStorage.setItem("proejctId", id);
  return id;
}

const getProjectById = async (id) => {
  let projects = await projectsApi.endpoints.list.useQuery(getId());
  const result = await projects.data.find((project) => project.id == id);
  return result;
};

export default function Project() {
  const [value, setValue] = useState("1");

  function handleTabChange(event, newValue) {
    setValue(newValue);
  }

  const [project, setProject] = useState(null);
  useEffect(() => {
    const fetchData = () => {
      const res = getProjectById(getId());
      setProject(res);
      console.log(project);
    };
    fetchData();
  }, []);

  return (
    <>
      <Layout>
        <Typography variant="h2" sx={{ ml: 3 }}>
          Project Calculator
        </Typography>
        <HorizontalLine />
        <TabContext value={value}>
          <Box sx={{ ml: 5 }}>
            <TabList onChange={handleTabChange}>
              <Tab label="Info" value="1" />
              <Tab label="Team" value="2" />
              <Tab label="Milestones" value="3" />
              <Tab label="Features" value="4" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <ProjectInfo />
          </TabPanel>

          <TabPanel value="2">
            <TeamList></TeamList>
          </TabPanel>

          <TabPanel value="3">
            <MilestoneList />
          </TabPanel>

          <TabPanel value="4">
            <FeatureList />
          </TabPanel>
        </TabContext>
      </Layout>
    </>
  );
}
