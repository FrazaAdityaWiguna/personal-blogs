"use client";

import React, { useCallback, useMemo, useState } from "react";
import { getListArticles } from "@/api/fetch";
import { QUERY_KEY } from "@/api/helpers/api.helpers";
import { Box, Card, CircularProgress, Stack, Typography } from "@mui/material";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import {
  DataListArticleType,
  ApiResponseListArticlesType,
  ResponseListArticlesType,
} from "@/types/articles";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [listArticles, setlistArticles] = useState<ResponseListArticlesType>();

  const getListArticlesQuery: UseQueryOptions<ApiResponseListArticlesType> = {
    queryFn: () => getListArticles(),
    queryKey: [QUERY_KEY.GET_LIST_ARTICLES],
    onSuccess: (data) => setlistArticles(data.data),
    refetchInterval: 1000 * 60 * 15,
  };

  const { isLoading } =
    useQuery<ApiResponseListArticlesType>(getListArticlesQuery);

  const renderCardArticle = useCallback(
    (article: DataListArticleType) => {
      return (
        <Card
          key={article.id}
          sx={{ width: "45%", cursor: "pointer" }}
          onClick={() => router.push(`/detail/${article.id}`)}
        >
          <Box sx={{ position: "relative", width: "100%", height: "200px" }}>
            <Image
              src="https://fakeimg.pl/300"
              alt={article.attributes.Title}
              fill
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </Box>
          <Box p={2}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "18px",
                mb: 1,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {article.attributes.Title}
            </Typography>
          </Box>
        </Card>
      );
    },
    [router]
  );

  const renderHome = useMemo(() => {
    if (isLoading) {
      return (
        <Stack justifyContent="center" alignItems="center" mt={15}>
          <CircularProgress />
        </Stack>
      );
    }

    return (
      <Stack gap={2} flexDirection="row" flexWrap="wrap">
        {listArticles &&
          listArticles.data?.map((article) => {
            return renderCardArticle(article);
          })}
      </Stack>
    );
  }, [listArticles, isLoading, renderCardArticle]);

  return renderHome;
};

export default Home;
