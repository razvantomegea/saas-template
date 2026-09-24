"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type SelectHTMLAttributes,
} from "react";

import { DataTestId } from "@/lib/constants/data-test-id";

/** Recessed well chrome shared by text inputs, selects, and dropdown triggers. */
export const controlFieldClassName =
  "box-border w-full rounded-lg border border-solid border-zinc-700 bg-zinc-950 text-base leading-5 text-zinc-100 outline-none [color-scheme:dark]";

export const selectMenuOptionClassName =
  "w-full cursor-pointer px-3 py-1.5 text-left text-zinc-100 hover:bg-emerald-600 hover:text-white active:bg-emerald-600 active:text-white";

export const selectMenuOptionSelectedClassName = "bg-emerald-600 text-white";

const SELECT_BASE_CLASS = `appearance-none flex items-center ${controlFieldClassName} pl-3 pr-10 focus:border-emerald-600 disabled:cursor-not-allowed disabled:opacity-50`;

const SELECT_SIZE_CLASS = {
  md: "h-10",
  /** Matches top-nav outline / CTA control height (`h-8`). */
  sm: "h-8",
} as const;

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectSize = keyof typeof SELECT_SIZE_CLASS;

type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children" | "size"
> & {
  options: readonly SelectOption[];
  /** Extra classes on the trigger. */
  className?: string;
  /** Stretch to container width (default true). */
  fullWidth?: boolean;
  /** Visual size. `sm` matches top-nav buttons. */
  size?: SelectSize;
  /** Explicit for destructuring; data-* is not a named HTMLAttributes key. */
  "data-testid"?: string;
};

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1 -1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function emitChange(onChange: SelectProps["onChange"], next: string) {
  onChange?.({
    target: { value: next },
    currentTarget: { value: next },
  } as ChangeEvent<HTMLSelectElement>);
}

/**
 * Shared listbox select. Native `<select>` menus ignore CSS option colors on
 * Windows Chrome, so every instance uses this menu for consistent chrome and
 * emerald hover / active / selected states.
 */
export function Select({
  options,
  className = "",
  fullWidth = true,
  size = "md",
  value,
  onChange,
  disabled,
  id,
  "data-testid": testId,
  "aria-label": ariaLabel,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLSpanElement>(null);
  const listId = useId();
  const selectedValue = typeof value === "string" ? value : "";
  const selectedOption =
    options.find((option) => option.value === selectedValue) ?? options[0];
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === selectedOption?.value),
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  function openMenu() {
    if (disabled) {
      return;
    }
    setActiveIndex(selectedIndex);
    setOpen(true);
  }

  function choose(next: string) {
    emitChange(onChange, next);
    setOpen(false);
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) {
      return;
    }
    if (
      event.key === "ArrowDown" ||
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      if (open) {
        if (event.key === "Enter" || event.key === " ") {
          const option = options[activeIndex];
          if (option) {
            choose(option.value);
          }
        } else {
          setActiveIndex((current) =>
            Math.min(current + 1, options.length - 1),
          );
        }
        return;
      }
      openMenu();
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (open) {
        setActiveIndex((current) => Math.max(current - 1, 0));
        return;
      }
      openMenu();
      return;
    }
    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <span
      ref={rootRef}
      className={`relative inline-flex min-w-0 ${fullWidth ? "w-full" : ""}`}
    >
      <button
        type="button"
        id={id}
        disabled={disabled}
        data-testid={testId}
        data-value={selectedOption?.value ?? ""}
        aria-label={ariaLabel}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onTriggerKeyDown}
        className={`${SELECT_BASE_CLASS} ${SELECT_SIZE_CLASS[size]} ${fullWidth ? "w-full" : ""} ${open ? "border-emerald-600" : ""} ${className} min-w-0 overflow-hidden text-left whitespace-nowrap`.trim()}
      >
        {selectedOption?.label ?? ""}
      </button>
      <ChevronIcon />
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className={`absolute top-full z-50 mt-1 max-h-56 overflow-y-auto rounded-lg border border-zinc-700 bg-zinc-950 py-1 shadow-lg ${fullWidth ? "w-full" : "right-0 min-w-full w-max"}`}
        >
          {options.map((option, index) => {
            const selected = option.value === selectedOption?.value;
            const active = index === activeIndex;
            return (
              <li key={option.value} className="px-0">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  data-value={option.value}
                  data-testid={
                    typeof testId === "string"
                      ? DataTestId.SelectOption(testId, option.value)
                      : undefined
                  }
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => choose(option.value)}
                  className={`${selectMenuOptionClassName} ${
                    selected || active ? selectMenuOptionSelectedClassName : ""
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </span>
  );
}

export const selectFieldClassName = `${SELECT_BASE_CLASS} ${SELECT_SIZE_CLASS.md}`;
