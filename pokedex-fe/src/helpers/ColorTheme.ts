export const LIGHT_THEME: AppTheme = {
  bgColor: "#F5F5F5",
  menuItemBg: "hsl(0, 0%, 95%)",
  hoverMenuItemBg: "hsl(0, 0%, 90%)",
  textColor: "hsl(0, 0%, 10%)",
  notCapturedColor: '"hsl(0, 0%, 10%)"',
  cardColor: "hsl(0, 0%, 93%)",
  accentColor: "#B00000",
  filterBg: "hsl(0, 0%, 95%)",
  borderColor: "hsl(0, 0%, 85%)",
  statGradient: "linear-gradient(90deg, #E63946 0%, #FFA69E 100%)",
  shadowColor: "rgba(0,0,0,0.05)",
  scrollbarColor: "rgba(0, 0, 0, 0.3) transparent",
  labelFocus: "#333",
  statsBackground: "rgba(0, 0, 0, 0.1)",
  themeBtnColor: "hsl(0, 0%, 10%)",
};

export const DARK_THEME: AppTheme = {
  bgColor: "hsl(0, 0%, 10%)",
  themeBtnColor: "#FFE78D",
  notCapturedColor: "hsl(0, 0%, 18%)",
  menuItemBg: "hsl(0, 0%, 15%)",
  hoverMenuItemBg: "hsl(0, 0%, 20%)",
  textColor: "hsl(0, 0%, 90%)",
  cardColor: "hsl(0, 0%, 15%)",
  accentColor: "#CC0000",
  filterBg: "hsl(0, 0%, 18%)",
  borderColor: "hsl(0, 0%, 25%)",
  statGradient: "linear-gradient(90deg, #F1FAEE 0%, #E63946 100%)",
  shadowColor: "rgba(255,255,255,0.05)",
  scrollbarColor: "rgba(255, 255, 255, 0.35) transparent",
  labelFocus: "#ccc",
  statsBackground: "rgba(255, 255, 255, 0.1)",
};

export interface AppTheme {
  bgColor: string;
  themeBtnColor: string;
  menuItemBg: string;
  hoverMenuItemBg: string;
  textColor: string;
  notCapturedColor: string;
  cardColor: string;
  accentColor: string;
  filterBg: string;
  borderColor: string;
  statGradient: string;
  shadowColor: string;
  scrollbarColor: string;
  labelFocus: string;
  statsBackground: string;
}
