import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import AnimalsView from "./AnimalsView";

beforeEach(() => {
  fetch.resetMocks();
  fetch.mockResponseOnce(
    JSON.stringify([
      { id: 1, name: "First Name", species: "First Species", age: 1 },
      { id: 2, name: "Second Name", species: "Second Species", age: 2 },
    ])
  );
  resizeWindow(900);
});

function resizeWindow(size) {
  act(() => {
    global.innerWidth = size;
    global.dispatchEvent(new Event("resize"));
  });
}

async function waitForRegex(text) {
  return waitFor(() => {
    const linkElement = screen.getByText(text);
    expect(linkElement).toBeInTheDocument();
  });
}

function setTextForInput(parent, testId, text) {
  const input = parent.getByTestId(testId);
  fireEvent.change(input, { target: { value: text } });
}

test("renders AnimalsView with animal table", async () => {
  const animalsView = render(<AnimalsView />);

  await waitForRegex(/First Species/i);

  const rows = animalsView.queryAllByRole("row");
  expect(rows.length).toBe(3);
  expect(rows[1].children.length).toBe(3);
  expect(rows[0].children[0]).toHaveTextContent("Name/Age");
  expect(rows[0].children[1]).toHaveTextContent("Species");
  expect(rows[1].children[0]).toHaveTextContent("First Name");
  expect(rows[1].children[1]).toHaveTextContent("1");
  expect(rows[1].children[2]).toHaveTextContent("First Species");
  expect(rows[2].children[0]).toHaveTextContent("Second Name");
  expect(rows[2].children[1]).toHaveTextContent("2");
  expect(rows[2].children[2]).toHaveTextContent("Second Species");

  resizeWindow(500);

  const compactRows = animalsView.queryAllByRole("row");
  expect(compactRows.length).toBe(3);
  expect(compactRows[1].children.length).toBe(2);
  expect(compactRows[0].children[0]).toHaveTextContent("Name/Age");
  expect(compactRows[0].children[1]).toHaveTextContent("Species");
  expect(compactRows[1].children[0]).toHaveTextContent("First Name");
  expect(compactRows[1].children[0]).toHaveTextContent("1");
  expect(compactRows[1].children[1]).toHaveTextContent("First Species");
  expect(compactRows[2].children[0]).toHaveTextContent("Second Name");
  expect(compactRows[2].children[0]).toHaveTextContent("2");
  expect(compactRows[2].children[1]).toHaveTextContent("Second Species");
});

test("filtering rows", async () => {
  const animalsView = render(<AnimalsView />);

  await waitForRegex(/First Species/i);

  const filter = animalsView.getByLabelText("Filter:");
  fireEvent.change(filter, { target: { value: "first" } });

  const filteredRows = animalsView.queryAllByRole("row");
  expect(filteredRows.length).toBe(2);
  expect(filteredRows[1].children[0]).toHaveTextContent("First Name");

  fireEvent.change(filter, { target: { value: "second" } });

  const secondFilteredRows = animalsView.queryAllByRole("row");
  expect(secondFilteredRows.length).toBe(2);
  expect(secondFilteredRows[1].children[0]).toHaveTextContent("Second Name");
});

test("Select Row", async () => {
  const animalsView = render(<AnimalsView />);

  await waitForRegex(/First Name/i);

  const rows = animalsView.queryAllByRole("row");
  expect(rows.length).toBe(3);
  expect(rows[1].children.length).toBe(3);
  expect(rows[1].className).toBe("");

  animalsView.getByTestId("animal-row-1").click();

  const updatedRows = animalsView.queryAllByRole("row");
  expect(updatedRows[1].className).toBe("rowSelected");
});

test("Add New Row", async () => {
  const animalsView = render(<AnimalsView />);

  await waitForRegex(/First Name/i);

  const rows = animalsView.queryAllByRole("row");
  expect(rows.length).toBe(3);
  expect(rows[1].children.length).toBe(3);
  expect(rows[1].children[0]).toHaveTextContent("First Name");
  expect(rows[2].children[0]).toHaveTextContent("Second Name");

  //Click add button
  animalsView.getByTestId("animal-add").click();
  await waitForRegex(/Editing Animal 3/i);

  //Fill out form
  setTextForInput(animalsView, "animal-name-input", "Third Name");
  setTextForInput(animalsView, "animal-age-input", "3");
  setTextForInput(animalsView, "animal-species-input", "Third Species");

  //View that table has values
  animalsView.getByTestId("animal-save").click();

  await waitForRegex(/Third Name/i);

  const updatedRows = animalsView.queryAllByRole("row");
  expect(updatedRows.length).toBe(4);
  expect(updatedRows[1].children.length).toBe(3);
  expect(updatedRows[1].children[0]).toHaveTextContent("First Name");
  expect(updatedRows[2].children[0]).toHaveTextContent("Second Name");
  expect(updatedRows[3].children[0]).toHaveTextContent("Third Name");
});

test("Edit Row", async () => {
  const animalsView = render(<AnimalsView />);

  await waitForRegex(/First Name/i);

  const rows = animalsView.queryAllByRole("row");
  expect(rows.length).toBe(3);
  expect(rows[1].children.length).toBe(3);
  expect(rows[1].children[0]).toHaveTextContent("First Name");
  expect(rows[2].children[0]).toHaveTextContent("Second Name");

  //Select animal to edit
  animalsView.getByTestId("animal-row-2").click();
  animalsView.getByTestId("animal-edit").click();
  await waitForRegex(/Editing Animal 2/i);

  //Fill out form
  setTextForInput(animalsView, "animal-name-input", "Second Edited Name");

  animalsView.getByTestId("animal-save").click();

  //View that table has values
  const updatedRows = animalsView.queryAllByRole("row");
  expect(updatedRows.length).toBe(3);
  expect(updatedRows[1].children.length).toBe(3);
  expect(updatedRows[1].children[0]).toHaveTextContent("First Name");
  expect(updatedRows[2].children[0]).toHaveTextContent("Second Edited Name");
});
