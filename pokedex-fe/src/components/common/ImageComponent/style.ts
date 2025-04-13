import { SxProps } from "@mui/material";

export const image: (isLoading: boolean) => SxProps = (isLoading: boolean) => {
  return {
    height: "100%",
    width: "100%",
    objectFit: "contain",

    userSelect: "none",
    borderRadius: "16px",
    pointerEvents: "none",
    flexShrink: 0,
    visibility: isLoading ? "hidden" : "visible",
  };
};

export const imageContainer: (containerHeight: number) => SxProps = (
  containerHeight
) => {
  return {
    position: "relative",
    height: "100%",
    paddingBottom: "16px",
    width: containerHeight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
};
