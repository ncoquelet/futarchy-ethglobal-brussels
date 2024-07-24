export const convertToSeconds = (value: string) => {
  switch (value) {
    case "5d":
      return 5 * 24 * 60 * 60;
    case "10d":
      return 10 * 24 * 60 * 60;
    case "1m":
      return 30 * 24 * 60 * 60;
    case "3m":
      return 3 * 30 * 24 * 60 * 60;
    case "6m":
      return 6 * 30 * 24 * 60 * 60;
    case "1y":
      return 12 * 30 * 24 * 60 * 60;
    default:
      return 0;
  }
};

export const convertToText = (second: number) => {
  switch (second) {
    case 5 * 24 * 60 * 60:
      return "5 days";
    case 10 * 24 * 60 * 60:
      return "10 days";
    case 30 * 24 * 60 * 60:
      return "1 month";
    case 3 * 30 * 24 * 60 * 60:
      return "3 months";
    case 6 * 30 * 24 * 60 * 60:
      return "6 months";
    case 12 * 30 * 24 * 60 * 60:
      return "1 year";
    default:
      return "-";
  }
};
