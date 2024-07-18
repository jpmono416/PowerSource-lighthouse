import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import "vitest-canvas-mock";

if (typeof window?.URL?.createObjectURL === "undefined") {
  window.URL.createObjectURL = () => {};
}

afterEach(() => {
  cleanup();
});
