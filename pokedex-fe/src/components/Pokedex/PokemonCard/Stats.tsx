import { Box, Typography, LinearProgress, useMediaQuery } from "@mui/material";
import { labelCss, linearProgress, statBarWrapper, statLabels } from "./styles";
import { Pokemon } from "../types";
import { useAppTheme } from "../../../themeSlice/hooks";

function getStats(pokemon: Pokemon) {
  return [
    { label: "HP", value: pokemon.hit_points },
    { label: "Atk", value: pokemon.attack },
    { label: "Def", value: pokemon.defense },
    { label: "SpA", value: pokemon.special_attack },
    { label: "SpD", value: pokemon.special_defense },
    { label: "Spe", value: pokemon.speed },
  ];
}
export function Stats({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        columnGap: 2,
        rowGap: 0.5,
      }}
    >
      {getStats(pokemon).map((stat) => (
        <StatBar label={stat.label} value={stat.value} key={stat.label} />
      ))}
    </Box>
  );
}

type StatBarProps = {
  label: string;
  value: number;
  max?: number;
};

const overTheAverageValue = 120;
export function StatBar({ label, value, max = 200 }: StatBarProps) {
  const theme = useAppTheme();

  return (
    <Box sx={statBarWrapper}>
      <Box sx={statLabels}>
        <Typography
          variant="caption"
          sx={labelCss}
          color={value > overTheAverageValue ? "red" : "inherit"}
        >
          {label}
        </Typography>
        <Typography
          variant="caption"
          sx={labelCss}
          color={value > overTheAverageValue ? "red" : "inherit"}
        >
          {value}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, position: "relative" }}>
        <LinearProgress
          variant="determinate"
          value={(value / max) * 100}
          sx={linearProgress(theme)}
        />
      </Box>
    </Box>
  );
}
