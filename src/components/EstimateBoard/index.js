import { Box, Typography } from "@mui/material";

export default function EstimateBoard({ project }) {
  return (
    <Box
      textAlign={"center"}
      minWidth={300}
      minHeight={200}
      sx={{
        backgroundColor: "#0085FC",
        color: "white",
        borderRadius: 2,
        border: "1px solid #0081F6",
      }}
    >
      <Typography variant="h5" sx={{ margin: 2 }}>
        Estimation
      </Typography>
      <Typography variant="h6" textAlign={"left"} sx={{ margin: 2 }}>
        Time: {Math.ceil(project.estimateInDays / 5)} weeks
      </Typography>
      <Typography variant="h6" textAlign={"left"} sx={{ margin: 2 }}>
        Budjet: {project.priceInRubles / 5} rubles
      </Typography>
    </Box>
  );
}
