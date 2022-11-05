import Form from "./Form";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

it("should render the form", () => {
  // triple A process

  // 1. Arrange -- viewing form
  render(<Form />);

  // 2. Act -- event
  const form = screen.getByRole("form");

  // 3. Assert -- is the form correct on page
  expect(form).toBeInTheDocument();
});

// Explore getBy, queryBy and findBy
it("should render the basic input fields", () => {
  render(<Form />);

  // getBy - finds only single element
  // throws error if finds multiple, or none
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByPlaceholderText(/e.g. test@test.com/);

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeTruthy();

  // getAllBy... -- gets multiple nodes
  // throws error if doesn't get any
  const inputs = screen.getAllByRole("textbox");
  inputs.forEach((input) => {
    expect(input).toBeInTheDocument();
  });
});

  it("should not render error message on load", () => {
    render(<Form />);

    // queryBy - returns single node
    // error if finds multiple, null if finds none
    const errorMessage = screen.queryByText(/Sorry something went wrong/);

    expect(errorMessage).not.toBeInTheDocument();
    expect(errorMessage).toBeFalsy();

  });

  it("success message is NOT there on load", () => {
    render(<Form />);
    const success = screen.queryByText(/Thank you for submitting! We'll be in touch/);

    expect(success).not.toBeInTheDocument();

  })

//   check that the form behaves as expected to the user when submitted
it ("should not submit form with invalid credentials and show warnings",() => {
    render (<Form />);

    const nameInput = screen.getByRole("textbox", { name: /name/i });
    userEvent.type(nameInput, "");

    const emailInput = screen.getByRole("textbox", {name: /email/i });
    userEvent.type(emailInput, "notvalidemail");

    const button = screen.queryByText(/Sign In/);
    userEvent.click(button);

    const errorMessage = screen.queryByText(/Sorry something went wrong/);
    expect(errorMessage).toBeInTheDocument();


    

    // 2 assertions -- error message should exist -- success message should not exist


} )

it("show Thank you for Submitting when successfully submitted", () => {
    render (<Form />);
    const nameInput = screen.getByRole("textbox", {name: /name/i});
    userEvent.type(nameInput, "John Doe");

    const emailInput = screen.getByRole("textbox", {name: /email/i });
    userEvent.type(emailInput, "test@test.com");

    const button = screen.queryByText(/Sign In/);
    userEvent.click(button);

    const success = screen.queryByText(/Thank you for submitting! We'll be in touch/);

    expect(success).toBeInTheDocument();
})

