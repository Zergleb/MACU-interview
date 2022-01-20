import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";

beforeEach(() => {
  fetch.resetMocks();
});

test("Test Stub", async () => {
  expect(1).toBe(1);
});
