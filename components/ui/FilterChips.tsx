"use client";

import { cn } from "@/lib/utils";

type FilterChipsProps = {
  options: string[];
  activeOption: string;
  onSelect: (option: string) => void;
};

export function FilterChips({ options, activeOption, onSelect }: FilterChipsProps) {
  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-auto pb-2 pr-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {options.map((option) => {
          const isActive = option === activeOption;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={cn(
                "whitespace-nowrap rounded-full border border-border px-4 py-2 text-sm",
                isActive ? "bg-text text-white" : "bg-background text-text"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent md:hidden" />
    </div>
  );
}
