import type { ReactNode } from "react";

type Block =
  | { type: "paragraph"; lines: string[] }
  | { type: "list"; items: string[] };

const LIST_LINE = /^[*+-] /;

function groupBlocks(text: string): Block[] {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i] ?? "";
    if (line.trim() === "") {
      i += 1;
      continue;
    }

    if (LIST_LINE.test(line)) {
      const items: string[] = [];
      while (i < lines.length && LIST_LINE.test(lines[i] ?? "")) {
        items.push((lines[i] ?? "").replace(LIST_LINE, ""));
        i += 1;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      (lines[i] ?? "").trim() !== "" &&
      !LIST_LINE.test(lines[i] ?? "")
    ) {
      paraLines.push(lines[i] ?? "");
      i += 1;
    }
    blocks.push({ type: "paragraph", lines: paraLines });
  }

  return blocks;
}

/** Inline: `code` then **bold**. Returns React nodes (no HTML strings). */
export function renderHelpBotInline(
  text: string,
  keyPrefix: string,
): ReactNode[] {
  const nodes: ReactNode[] = [];
  const codeParts = text.split(/(`[^`]+`)/g);

  codeParts.forEach((segment, i) => {
    if (
      segment.length >= 2 &&
      segment.startsWith("`") &&
      segment.endsWith("`")
    ) {
      nodes.push(
        <code
          key={`${keyPrefix}-c-${i}`}
          className="rounded bg-zinc-800 px-1 py-0.5 font-mono text-[0.85em] text-emerald-300"
        >
          {segment.slice(1, -1)}
        </code>,
      );
      return;
    }

    const boldParts = segment.split(/(\*\*[^*]+\*\*)/g);
    boldParts.forEach((part, j) => {
      if (part.length >= 4 && part.startsWith("**") && part.endsWith("**")) {
        nodes.push(
          <strong
            key={`${keyPrefix}-b-${i}-${j}`}
            className="font-semibold text-zinc-100"
          >
            {part.slice(2, -2)}
          </strong>,
        );
      } else if (part) {
        nodes.push(part);
      }
    });
  });

  return nodes;
}

export function HelpBotMarkdown({ text }: { text: string }) {
  const blocks = groupBlocks(text);

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {blocks.map((block, bi) => {
        if (block.type === "list") {
          return (
            <ul
              key={`list-${bi}`}
              className="list-disc space-y-1 pl-4 text-zinc-300"
            >
              {block.items.map((item, ii) => (
                <li key={`li-${bi}-${ii}`}>
                  {renderHelpBotInline(item, `li-${bi}-${ii}`)}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`p-${bi}`} className="text-zinc-300">
            {block.lines.map((line, li) => (
              <span key={`line-${bi}-${li}`}>
                {li > 0 ? <br /> : null}
                {renderHelpBotInline(line, `p-${bi}-${li}`)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
