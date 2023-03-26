import "@testing-library/jest-dom";

import React from "react";
import { render, screen } from "@testing-library/react";
// eslint-disable-next-line import/no-extraneous-dependencies

// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, test } from "@jest/globals";

import App from "../pages/about/About";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  test("renders App component", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    screen.debug();
    // expect(screen.getByRole("h2")).toHaveTextContent("index");
    const element = screen.getByTestId("custom-element");
    expect(element.innerHTML).toBe("go Index");
  });
});
