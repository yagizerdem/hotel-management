import { BaseProvider } from "../provider/base-provider";
import { AppJumbotron } from "./app-jumbutron";

export default function Home() {
  return (
    <BaseProvider>
      <AppJumbotron />
    </BaseProvider>
  );
}
