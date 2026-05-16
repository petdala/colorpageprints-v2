import { cn } from "@/lib/utils";
import { getBookStatus, getBookStatusLabel } from "@/lib/storefront";
import type { Book, BookStatus } from "@/lib/types";
import { Badge } from "./badge";

const toneClasses: Record<BookStatus, string> = {
  idea: "border-border bg-surface-alt text-text-muted",
  collecting_interest: "border-[#d9b791] bg-[#fff4e9] text-text",
  in_production: "border-[#b7b391] bg-[#f2f1e6] text-text",
  sampler_available: "border-[#d6ad63] bg-[#fff8e7] text-text",
  launch_list_open: "border-[#9cad87] bg-[#edf5e7] text-text",
  preorder_soon: "border-[#c9aa8e] bg-[#fbf0e8] text-text",
  preorder_open: "border-[#e09d78] bg-[#fff0e7] text-text",
  available: "border-[#8ca06f] bg-[#edf5e7] text-text"
};

type BookStatusBadgeProps = {
  book?: Book;
  status?: BookStatus;
  className?: string;
};

export function BookStatusBadge({ book, status, className }: BookStatusBadgeProps) {
  const resolvedStatus = status ?? (book ? getBookStatus(book) : "collecting_interest");

  return <Badge className={cn(toneClasses[resolvedStatus], className)}>{getBookStatusLabel(resolvedStatus)}</Badge>;
}
