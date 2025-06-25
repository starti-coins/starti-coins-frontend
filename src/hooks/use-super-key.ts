const superKeys = {
  Command: {
    name: "Command",
    symbol: "⌘",
  },
  Control: {
    name: "Control",
    symbol: "Ctrl",
  },
} as const;

export const useSuperKey = () => {
  if (typeof window === "undefined") {
    return {
      name: "Super",
      symbol: "Super",
    };
  }

  const isMac = navigator.userAgent.includes("Mac");
  return isMac ? superKeys.Command : superKeys.Control;
};
