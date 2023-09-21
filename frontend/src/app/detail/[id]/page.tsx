import DetailArticle from "@/components/DetailArticle/DetailArticle";
import dynamic from "next/dynamic";
import React from "react";

const DetailPage = () => {
  return <DetailArticle />;
};

export default dynamic(() => Promise.resolve(DetailPage), {
  ssr: false,
});
