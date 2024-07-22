import ScreenSizes from "./enums/ScreenSizes";

export default function getScreenSize() {
  const screenSize = window.innerWidth;
  if (screenSize < 640) return ScreenSizes.SMALL;
  if (screenSize < 768) return ScreenSizes.MEDIUM;
  if (screenSize < 1024) return ScreenSizes.LARGE;
  return ScreenSizes.EXTRA_LARGE;
}
