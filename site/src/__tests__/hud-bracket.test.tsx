import React from "react";
import { render } from "@testing-library/react";
import { HudBracket } from "../components/HudBracket";

describe("HudBracket", () => {
  it("renders content with framing label", () => {
    const { asFragment, getByText } = render(
      <HudBracket label="Highlight">
        <div>Telemetry Active</div>
      </HudBracket>
    );

    expect(getByText("Telemetry Active")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
