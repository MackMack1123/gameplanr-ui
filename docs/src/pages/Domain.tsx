import React from "react";
import { DiamondField } from "@gameplanr/ui";
import { Section, Example } from "../Section";

export function DomainSection({ id }: { id: string }) {
  const [selected, setSelected] = React.useState<"P" | "C" | "1B" | "2B" | "3B" | "SS" | "LF" | "CF" | "RF" | undefined>("P");
  return (
    <Section id={id} title="Domain" description="DiamondField — Lineup-specific baseball diamond viz, lives in the shared lib.">
      <Example label="DiamondField (filled, click to select)">
        <div style={{ width: 360 }}>
          <DiamondField
            selected={selected}
            onPositionClick={(p) => setSelected(p)}
            positions={{
              P:  { number: 12, name: "Lopez" },
              C:  { number: 8,  name: "Rivera" },
              "1B": { number: 5, name: "Smith" },
              "2B": { number: 3, name: "Tan" },
              "3B": { number: 21, name: "Park" },
              SS: { number: 7,  name: "Johnson" },
              LF: { number: 14, name: "Garcia" },
              CF: { number: 9,  name: "Khan" },
              RF: { number: 22, name: "Mason J" },
            }}
          />
        </div>
      </Example>

      <Example label="DiamondField (empty)">
        <div style={{ width: 280 }}>
          <DiamondField positions={{}} />
        </div>
      </Example>
    </Section>
  );
}
