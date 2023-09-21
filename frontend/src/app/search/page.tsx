import Search from "@/components/Search/Search";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Search",
};

const SearchPage = () => {
  return <Search />;
};

export default dynamic(() => Promise.resolve(SearchPage), {
  ssr: false,
});
