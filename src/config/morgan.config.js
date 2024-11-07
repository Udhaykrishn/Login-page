import morgan from "morgan";

export function morganConfig(setStream) {
  return morgan("combined", { stream: setStream() });
}
