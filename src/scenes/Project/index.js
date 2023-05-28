import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";

import HorizontalLine from "@root/components/HorizontalLine";
import ProjectInfo from "@root/components/ProjectInfo";

import projectsApi from "@root/store/projectApi";
import milestonesApi from "@root/store/milestoneApi";
import MilestoneList from "@root/components/MilestoneList";

function getId() {
  const currentURL = window.location.href;
  let id = currentURL.substring(
    currentURL.lastIndexOf("/projects") + 10,
    currentURL.length
  );
  return id;
}

const getProjectById = async (id) => {
  const projects = await projectsApi.endpoints.list.useQuery();
  return projects.data.find((project) => project.id == id);
};

export default function Project() {
  const [value, setValue] = useState("1");
  function handleTabChange(event, newValue) {
    setValue(newValue);
  }
  const milestones = milestonesApi.endpoints.list.useQuery(getId());
  console.log(milestones);
  return (
    <>
      <Typography variant="h2" sx={{ ml: 3 }}>
        Project Calculator
      </Typography>
      <HorizontalLine />
      <TabContext value={value}>
        <Box>
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
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">
          <MilestoneList milestones={milestones} />
        </TabPanel>
        <TabPanel value="4">Item Four</TabPanel>
      </TabContext>
    </>
  );
}
