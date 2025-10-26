import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@/components/ui/input";

describe("Input Component", () => {
  it("renders input element", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("renders with placeholder", () => {
    render(<Input placeholder="Enter text..." />);
    expect(screen.getByPlaceholderText("Enter text...")).toBeInTheDocument();
  });

  it("accepts text input", async () => {
    const user = userEvent.setup();
    render(<Input />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello World");

    expect(input).toHaveValue("Hello World");
  });

  it("handles onChange event", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "test");

    expect(handleChange).toHaveBeenCalled();
  });

  it("can be disabled", () => {
    render(<Input disabled />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("accepts custom className", () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  it("supports different input types", () => {
    const { rerender } = render(<Input type="text" />);
    let input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "text");

    rerender(<Input type="email" />);
    input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");
  });

  it("handles onKeyDown event", async () => {
    const handleKeyDown = vi.fn();
    const user = userEvent.setup();
    render(<Input onKeyDown={handleKeyDown} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "{Enter}");

    expect(handleKeyDown).toHaveBeenCalled();
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(<Input ref={ref as any} />);
    expect(ref.current).not.toBeNull();
  });

  it("renders with value prop", () => {
    render(<Input value="Initial value" readOnly />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Initial value");
  });
});
