import "@/styles/globals.css";
import AuthContext from "../../context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthContext>
      <Component {...pageProps} />
    </AuthContext>
  );
}
