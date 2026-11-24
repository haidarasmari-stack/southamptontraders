import { BookmarkCheck, BookmarkPlus } from "lucide-react";
import { useShortlist } from "@/contexts/ShortlistContext";

export default function ShortlistToggle({ builderSlug, builderName }: { builderSlug: string; builderName: string }) {
  const { savedBuilderSlugs, ready, toggleBuilder } = useShortlist();
  const saved = savedBuilderSlugs.includes(builderSlug);
  const Icon = saved ? BookmarkCheck : BookmarkPlus;
  const label = saved ? `Remove ${builderName} from your shortlist` : `Save ${builderName} to your shortlist`;
  return (
    <button
      className={`builder-card-action shortlist-toggle${saved ? " shortlist-toggle-saved" : ""}`}
      type="button"
      aria-label={label}
      aria-pressed={saved}
      disabled={!ready}
      onClick={() => toggleBuilder(builderSlug)}
    >
      <Icon size={15} aria-hidden="true" />
      <span>{saved ? "Saved" : "Save to shortlist"}</span>
    </button>
  );
}
