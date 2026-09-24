import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { useRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DataTestId } from "@/lib/constants/data-test-id";
import { useFocusTrap } from "@/lib/a11y/use-focus-trap";

function FocusTrapFixture({
  active,
  onEscape,
}: {
  active: boolean;
  onEscape?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useFocusTrap({
    containerRef,
    active,
    onEscape,
  });

  return (
    <div>
      <button type="button" data-testid={DataTestId.FocusTrapOutside}>
        Outside
      </button>
      {active ? (
        <div ref={containerRef} data-testid={DataTestId.FocusTrap}>
          <button type="button" data-testid={DataTestId.FocusTrapInsideFirst}>
            Inside first
          </button>
          <button type="button" data-testid={DataTestId.FocusTrapInsideLast}>
            Inside last
          </button>
        </div>
      ) : null}
    </div>
  );
}

describe("useFocusTrap", () => {
  afterEach(() => {
    cleanup();
  });

  it("calls onEscape when Escape is pressed", () => {
    const onEscape = vi.fn();
    render(<FocusTrapFixture active onEscape={onEscape} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onEscape).toHaveBeenCalledOnce();
  });

  it("wraps Tab from the last focusable element to the first", () => {
    render(<FocusTrapFixture active />);

    const first = screen.getByTestId(DataTestId.FocusTrapInsideFirst);
    const last = screen.getByTestId(DataTestId.FocusTrapInsideLast);
    last.focus();

    fireEvent.keyDown(document, { key: "Tab" });

    expect(document.activeElement).toBe(first);
  });

  it("pulls Tab focus into the container when focus is outside", () => {
    render(<FocusTrapFixture active />);

    screen.getByTestId(DataTestId.FocusTrapOutside).focus();

    fireEvent.keyDown(document, { key: "Tab" });

    expect(document.activeElement).toBe(
      screen.getByTestId(DataTestId.FocusTrapInsideFirst),
    );
  });

  it("ignores Escape when onEscape is not provided", () => {
    render(<FocusTrapFixture active />);

    expect(() => {
      fireEvent.keyDown(document, { key: "Escape" });
    }).not.toThrow();
  });

  it("ignores non-Tab keys while active", () => {
    render(<FocusTrapFixture active />);
    const first = screen.getByTestId(DataTestId.FocusTrapInsideFirst);
    first.focus();

    fireEvent.keyDown(document, { key: "Enter" });

    expect(document.activeElement).toBe(first);
  });

  it("restores previous focus when deactivated", async () => {
    const outside = document.createElement("button");
    outside.type = "button";
    outside.textContent = "Prior";
    document.body.appendChild(outside);
    outside.focus();

    const { rerender } = render(<FocusTrapFixture active />);
    await act(async () => {
      await new Promise((resolve) =>
        requestAnimationFrame(() => resolve(undefined)),
      );
    });

    rerender(<FocusTrapFixture active={false} />);
    expect(document.activeElement).toBe(outside);
    outside.remove();
  });

  it("wraps Shift+Tab from the first focusable element", () => {
    render(<FocusTrapFixture active />);

    const first = screen.getByTestId(DataTestId.FocusTrapInsideFirst);
    const last = screen.getByTestId(DataTestId.FocusTrapInsideLast);
    first.focus();

    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });

    expect(document.activeElement).toBe(last);
  });
});
