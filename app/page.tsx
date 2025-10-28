import HomePage from "./[lang]/page";

export default function RootAliasPage() {
  // default route "/" should show English content
  return <HomePage params={{ lang: "en" }} />;
}
