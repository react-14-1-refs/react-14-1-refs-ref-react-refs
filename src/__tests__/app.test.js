import { render } from "@testing-library/react";

import App from "../components/app/app.js";

it("Renders App without crashing", () => {
  render(<App />);
});
