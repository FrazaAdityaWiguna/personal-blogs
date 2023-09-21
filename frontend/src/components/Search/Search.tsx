"use client";

import { getListArticlesBySearch } from "@/api/fetch";
import { MUTATION_KEY } from "@/api/helpers/api.helpers";
import {
  ApiResponseListArticlesType,
  DataListArticleType,
  ResponseListArticlesType,
} from "@/types/articles";
import { Box, Card, CircularProgress, Stack, Typography } from "@mui/material";
import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listArticles, setlistArticles] = useState<ResponseListArticlesType>();

  const getListArticlesBysearchMutation: UseMutationOptions<ApiResponseListArticlesType> =
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mutationFn: (payload: any) => getListArticlesBySearch(payload),
      mutationKey: [MUTATION_KEY.GET_LIST_ARTICLES_BY_SEARCH],
      onSuccess: (data) => setlistArticles(data.data),
    };

  const mutationGetListArticlesBySearch =
    useMutation<ApiResponseListArticlesType>(getListArticlesBysearchMutation);

  useEffect(() => {
    const params = searchParams.get("q");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationGetListArticlesBySearch.mutate(params as any);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const renderCardArticle = useCallback(
    (article: DataListArticleType) => {
      return (
        <Card
          key={article.id}
          sx={{ width: "45%", maxHeight: "320px", cursor: "pointer" }}
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

  const renderSearch = useMemo(() => {
    if (mutationGetListArticlesBySearch.isLoading) {
      return (
        <Stack justifyContent="center" alignItems="center" mt={15}>
          <CircularProgress />
        </Stack>
      );
    }

    return (
      <>
        <Stack gap={2} my={2} flexDirection="row" flexWrap="wrap">
          {listArticles &&
            listArticles.data?.map((article) => {
              return renderCardArticle(article);
            })}
        </Stack>
      </>
    );
  }, [
    listArticles,
    mutationGetListArticlesBySearch.isLoading,
    renderCardArticle,
  ]);

  return renderSearch;
};

export default Search;
