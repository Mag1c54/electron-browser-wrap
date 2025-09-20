import WebView from "@/components/webview/Webview";
import TitleBar from "@/components/title-bar/TitleBar";
import "./Home.scss";

export default function Home() {
  return (
    <div>
      <TitleBar />
      <div>
        <WebView />
      </div>
    </div>
  );
}
