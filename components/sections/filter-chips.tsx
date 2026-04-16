import { Badge } from "@/components/ui/badge";

const chips = ["Nature", "Fantasy", "Mindfulness", "Seasonal", "Kids"];

export function FilterChips() {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <Badge key={chip}>{chip}</Badge>
      ))}
    </div>
  );
}
