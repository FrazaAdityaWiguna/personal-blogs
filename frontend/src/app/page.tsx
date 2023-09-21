import Home from "@/components/Home/Home";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Home",
};

const HomePage = () => {
  return <Home />;
};

export default dynamic(() => Promise.resolve(HomePage), {
  ssr: false,
});
