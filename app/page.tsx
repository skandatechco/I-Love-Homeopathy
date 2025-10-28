// default root "/" if someone goes without /en
import HomePage from "./[lang]/page";

export default function RootAliasPage() {
  return <HomePage params={{ lang: "en" }} />;
}
