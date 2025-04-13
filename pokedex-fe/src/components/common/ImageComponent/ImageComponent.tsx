import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import { image, imageContainer } from "./style";

import fallbackImage from "../../../images/pokemon-fallback.png";

function onImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = e.currentTarget;
  if (!target.dataset.fallback) {
    target.src = fallbackImage;
    target.dataset.fallback = "true";
  }
}
export function ImageComponent({
  name,
  imagePath,
  containerHeight,
}: {
  imagePath: string;
  name: string;
  containerHeight: number;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <Box sx={imageContainer(containerHeight)}>
      {isLoading && <CircularProgress size={40} />}
      <Box
        component="img"
        src={imagePath}
        alt={name}
        loading="lazy"
        onError={onImageError}
        onLoad={handleLoad}
        sx={image(isLoading)}
      />
    </Box>
  );
}
