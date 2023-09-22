import Search from "@/components/Search/Search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
};

const SearchPage = () => {
  return <Search />;
};

export default SearchPage;
