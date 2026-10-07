"use client";

import React, { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";
import { Theme, getTheme, setTheme, subscribeTheme } from "@/lib/theme";

const options: { value: Theme; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
];

export default function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribeTheme, getTheme, () => "light");

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded overflow-hidden"
    >
      {options.map(({ value, label, Icon }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${label} theme`}
            title={`${label} theme`}
            onClick={() => setTheme(value)}
            className={`p-1.5 transition ${
              isActive
                ? "bg-red-600 text-white"
                : "text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        );
      })}
    </div>
  );
}
