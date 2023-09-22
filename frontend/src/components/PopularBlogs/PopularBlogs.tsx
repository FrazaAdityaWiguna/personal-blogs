import { getListArticles } from "@/api/fetch";
import { QUERY_KEY } from "@/api/helpers/api.helpers";
import {
  ApiResponseListArticlesType,
  DataListArticleType,
} from "@/types/articles";
import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";

const PopularBlogs = () => {
  const router = useRouter();
  const [popularArticles, setpopularArticles] =
    useState<DataListArticleType[]>();

  const getListArticlesQuery: UseQueryOptions<ApiResponseListArticlesType> = {
    queryFn: () => getListArticles(),
    queryKey: [QUERY_KEY.GET_LIST_ARTICLES],
    onSuccess: (data) => setpopularArticles(data.data.data),
    refetchInterval: 1000 * 60 * 15,
  };

  const { isLoading } =
    useQuery<ApiResponseListArticlesType>(getListArticlesQuery);

  const onSortViews = useCallback((data: DataListArticleType[]) => {
    const sort = data
      .sort((a, b) => b.attributes.views - a.attributes.views)
      .slice(0, 5);

    return sort;
  }, []);

  const renderPopularBlogs = useMemo(() => {
    if (isLoading) {
      return (
        <Stack alignItems="center" mt={15}>
          <CircularProgress size={30} />
        </Stack>
      );
    }

    return (
      <Stack>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "18px",
          }}
          mb={1}
        >
          Popular Blog&#39;s
        </Typography>
        <Divider />

        <Stack gap={2} mt={2}>
          {popularArticles &&
            onSortViews(popularArticles).map((article) => {
              return (
                <Box
                  key={article.id}
                  onClick={() => router.push(`/detail/${article.id}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <Stack
                    flexDirection="row"
                    mb={2}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack gap={2} maxWidth="75%">
                      <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                        {article.attributes.Title}
                      </Typography>
                      <Typography sx={{ fontSize: "14px" }}>
                        Indira Lintang
                      </Typography>
                    </Stack>

                    <Image
                      src="https://fakeimg.pl/300"
                      alt={"article.attributes.Title"}
                      width={80}
                      height={50}
                      style={{
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                      priority
                      sizes="(min-width: 808px) 200px, 300px"
                    />
                  </Stack>
                  <Divider />
                </Box>
              );
            })}
        </Stack>
      </Stack>
    );
  }, [isLoading, onSortViews, popularArticles, router]);

  return renderPopularBlogs;
};

export default PopularBlogs;
