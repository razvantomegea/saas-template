import { describe, expect, it } from "vitest";
import { getFocusableElements, handleTabTrap } from "@/lib/a11y/focus-trap";

describe("focus-trap", () => {
  it("returns focusable elements inside the root", () => {
    const root = document.createElement("div");
    root.innerHTML = `
      <button type="button">One</button>
      <button type="button" disabled>Disabled</button>
      <a href="/x">Link</a>
      <span tabindex="-1">Skip</span>
    `;
    document.body.appendChild(root);

    expect(getFocusableElements(root)).toHaveLength(2);
    root.remove();
  });

  it("returns false when there are no focusable elements", () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    expect(handleTabTrap({ container, shiftKey: false })).toBe(false);
    container.remove();
  });

  it("wraps Shift+Tab from the first focusable element to the last", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button type="button" id="first">First</button>
      <button type="button" id="last">Last</button>
    `;
    document.body.appendChild(container);
    const first = container.querySelector("#first") as HTMLElement;
    const last = container.querySelector("#last") as HTMLElement;
    first.focus();

    expect(handleTabTrap({ container, shiftKey: true })).toBe(true);
    expect(document.activeElement).toBe(last);
    container.remove();
  });

  it("returns false when tabbing within the middle of the trap", () => {
    const container = document.createElement("div");
    container.innerHTML = `
      <button type="button" id="first">First</button>
      <button type="button" id="middle">Middle</button>
      <button type="button" id="last">Last</button>
    `;
    document.body.appendChild(container);
    (container.querySelector("#middle") as HTMLElement).focus();

    expect(handleTabTrap({ container, shiftKey: false })).toBe(false);
    expect(handleTabTrap({ container, shiftKey: true })).toBe(false);
    container.remove();
  });
});
