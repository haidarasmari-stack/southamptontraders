export type ProjectBriefInput = {
  service: string;
  area: string;
  scope: string;
  materials: string;
  timing: string;
};

function cleanText(value: string) {
  return value.trim().replace(/\r\n?/g, "\n").replace(/[ \t]+\n/g, "\n");
}

export function buildProjectBrief(input: ProjectBriefInput) {
  const scope = cleanText(input.scope);
  const materials = cleanText(input.materials);
  const lines = [
    "PROJECT BRIEF — draft for discussion",
    "",
    `Service: ${cleanText(input.service) || "Not specified"}`,
    `Area: ${cleanText(input.area) || "Not specified"}`,
    "",
    "Work requested:",
    scope || "Not specified",
    "",
    "Materials or preferences:",
    materials || "Not specified",
    "",
    `Timing: ${cleanText(input.timing) || "Not specified"}`,
    "",
    "Questions to discuss directly with each business:",
    "• Can you take on this work, and what is included in a written quote?",
    "• What could change the scope or price, and what are the expected dates?",
    "• Which qualifications, insurance or permissions are relevant to this project?",
    "",
    "This is only a draft for your own use. Southampton Traders has not submitted or sent an enquiry.",
  ];

  return lines.join("\n");
}
