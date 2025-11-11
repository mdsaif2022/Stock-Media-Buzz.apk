interface AdPlaceholderProps {
  placement: "header" | "sidebar" | "footer" | "interstitial" | "popunder";
  className?: string;
}

export default function AdPlaceholder({ placement, className = "" }: AdPlaceholderProps) {
  const placementConfig = {
    header: {
      height: "h-24",
      text: "Header Ad - 728x90",
    },
    sidebar: {
      height: "h-96",
      text: "Sidebar Ad - 300x600",
    },
    footer: {
      height: "h-32",
      text: "Footer Ad - 728x90",
    },
    interstitial: {
      height: "h-96",
      text: "Interstitial Ad - Full Screen",
    },
    popunder: {
      height: "h-96",
      text: "Popunder Ad",
    },
  };

  const config = placementConfig[placement];

  return (
    <div
      className={`bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 border-2 border-dashed border-slate-400 dark:border-slate-600 rounded-lg flex items-center justify-center ${config.height} ${className}`}
      data-adsterra-placement={placement}
    >
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          {config.text}
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          Adsterra Ad will display here
        </p>
      </div>
    </div>
  );
}
