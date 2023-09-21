"use client";

import { getDetailArticle } from "@/api/fetch";
import { QUERY_KEY } from "@/api/helpers/api.helpers";
import { ApiResponseDetailArticle } from "@/types/articles";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";

const DetailArticle = () => {
  const params = useParams();
  const id: string | string[] = params.id || "";

  const getDetailArticlesQuery: UseQueryOptions<ApiResponseDetailArticle> = {
    queryFn: () => getDetailArticle(id),
    queryKey: [QUERY_KEY.GET_DETAIL_ARTICLE],
  };

  const { isLoading, data: dataArticle } = useQuery<ApiResponseDetailArticle>(
    getDetailArticlesQuery
  );

  const renderDetailArticle = useMemo(() => {
    if (isLoading) {
      return (
        <Stack justifyContent="center" alignItems="center" mt={15}>
          <CircularProgress />
        </Stack>
      );
    }

    return (
      <Stack sx={{ maxWidth: "95%" }}>
        <Typography>{dataArticle?.data.data.attributes.Title}</Typography>
        {dataArticle && (
          <ReactMarkdown>
            {dataArticle?.data.data.attributes.Description}
          </ReactMarkdown>
        )}
      </Stack>
    );
  }, [dataArticle, isLoading]);

  return renderDetailArticle;
};

export default DetailArticle;
