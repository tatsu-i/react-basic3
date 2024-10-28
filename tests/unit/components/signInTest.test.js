import React from "react";
import { render, screen } from "@testing-library/react";
import SignInTest from "../../../src/test-pages/SignInTest";

test("レンダリングの確認", () => {
  render(<SignInTest />);

  expect(screen.getByTestId("emailInput")).toBeInTheDocument();
  expect(screen.getByTestId("passwordInput")).toBeInTheDocument();
  expect(screen.getByTestId("signInButton")).toBeInTheDocument();
});
