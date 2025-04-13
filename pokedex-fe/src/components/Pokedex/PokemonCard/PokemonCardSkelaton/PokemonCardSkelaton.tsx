import { Box, Card, Skeleton, Typography } from "@mui/material";
import {
  skeletonCardContainer,
  skeletonImage,
  skeletonText,
  skeletonStatContainer,
  skeletonStatLabel,
  skeletonStatBar,
  skeletonChip,
} from "./styles";
import { useAppTheme } from "../../../../themeSlice/hooks";

const PokemonCardSkeleton = ({ cardHeight }: { cardHeight: number }) => {
  const theme = useAppTheme();
  return (
    <Card sx={skeletonCardContainer(theme, cardHeight)}>
      <Skeleton variant="circular" sx={skeletonImage(theme)} />

      <Box sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" sx={skeletonText(theme)} />
        {["HP", "Def", "SpD"].map((label) => (
          <Box key={label} sx={skeletonStatContainer(theme)}>
            <Typography sx={skeletonStatLabel(theme)}>{label}</Typography>
            <Skeleton variant="rectangular" sx={skeletonStatBar(theme)} />
          </Box>
        ))}
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        {["Atk", "SpA", "Spe"].map((label) => (
          <Box key={label} sx={skeletonStatContainer(theme)}>
            <Typography sx={skeletonStatLabel(theme)}>{label}</Typography>
            <Skeleton variant="rectangular" sx={skeletonStatBar(theme)} />
          </Box>
        ))}
      </Box>

      <Skeleton variant="rounded" sx={skeletonChip(theme)} />
    </Card>
  );
};

export default PokemonCardSkeleton;
