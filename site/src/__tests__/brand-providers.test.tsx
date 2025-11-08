import React from "react";
import { render } from "@testing-library/react";
import { BrandProviders } from "../components/BrandProviders";

describe("BrandProviders", () => {
  it("renders children inside motion and sound contexts", () => {
    const { asFragment, getByText } = render(
      <BrandProviders>
        <div>Shell Ready</div>
      </BrandProviders>
    );

    expect(getByText("Shell Ready")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
