import { SxProps } from "@mui/material";
import { AppTheme } from "../../../../helpers/ColorTheme";

export const skeletonCardContainer = (
  theme: AppTheme,
  cardHeight: number
): SxProps => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  height: cardHeight,
  p: 1,
  backgroundColor: theme.cardColor,
  color: theme.textColor,
  borderRadius: 2,
  gap: 2,
});

export const skeletonImage = (_theme: AppTheme): SxProps => ({
  width: 64,
  height: 64,
  borderRadius: "50%",
});

export const skeletonText = (_theme: AppTheme): SxProps => ({
  width: 100,
  height: 24,
});

export const skeletonStatContainer = (_theme: AppTheme): SxProps => ({
  display: "flex",
  alignItems: "center",
  mt: 1,
});

export const skeletonStatLabel = (_theme: AppTheme): SxProps => ({
  width: 30,
});

export const skeletonStatBar = (_theme: AppTheme): SxProps => ({
  width: "80%",
  height: 10,
  ml: 1,
});

export const skeletonChip = (_theme: AppTheme): SxProps => ({
  width: 50,
  height: 24,
  borderRadius: 12,
});
