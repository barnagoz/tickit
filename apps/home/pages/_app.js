import "../styles/globals.css";
import dynamic from "next/dynamic";
import Footer from "../components/footer";
import ProjectUnderDev from "../components/project_under_dev";
import HeadTag from "../components/head";

const NavBar = dynamic(() => import("../components/navbar"), {
  ssr: false,
});
const domains = {
  currentDomain: "http://localhost:3000",
  loginRegDomain: "http://localhost:2000",
};
function MyApp({ Component, pageProps }) {
  pageProps = { ...pageProps, domains };

  return (
    <body className="w-full-width overflow-x-hidden">
      <HeadTag></HeadTag>
      <ProjectUnderDev></ProjectUnderDev>
      <NavBar domains={domains} />
      <Component {...pageProps} />
      <Footer domains={domains} />
    </body>
  );
}

export default MyApp;
