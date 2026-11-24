export type ProposedCopy = {
  text: string;
  status: "proposed";
};

/** Central draft register: every revised string remains explicitly proposed. */
export const proposedCopy = new Map<string, ProposedCopy>();

/** Marks draft client copy while preserving a simple string API for existing components. */
export function proposed<const T extends string>(text: T) {
  const existing = proposedCopy.get(text);
  if (existing) return existing as ProposedCopy & { text: T };
  const record = { text, status: "proposed" as const };
  proposedCopy.set(text, record);
  return record;
}
