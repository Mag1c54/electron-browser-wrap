import "./ErrorPage.scss";
import logo from "../../assets/logo.ico";

interface ErrorPageProps {
  url: string;

}

export function ErrorPage({ url }: ErrorPageProps) {
  return (
    <div className="error-page">
      <img
        src={logo}
        alt="Logo"
        className="logo"
        width={80}
        height={80}
      />

      <h2>Oops! Something went wrong</h2>
      <p>We couldn’t load: <span className="error-url">{url}</span></p>
    </div>
  );
}
