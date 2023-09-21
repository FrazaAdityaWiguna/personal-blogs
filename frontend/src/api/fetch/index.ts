"use client";

import { httpClient } from "@/config/httpClient";
import { ENDPOINT } from "../endpoint";
import {
  ApiResponseDetailArticle,
  ApiResponseListArticlesType,
} from "@/types/articles";

export const getListArticles = (): Promise<ApiResponseListArticlesType> => {
  return httpClient.get(`${ENDPOINT.GET_LIST_ARTICLES}`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getListCategory = (): Promise<any> => {
  return httpClient.get(`${ENDPOINT.GET_LIST_CATEGORIES}`);
};

export const getListArticlesBySearch = (
  payload: string
): Promise<ApiResponseListArticlesType> => {
  return httpClient.get(
    `${ENDPOINT.GET_LIST_ARTICLES}?filters[Title][$contains]=${payload}`
  );
};

export const getDetailArticle = (
  payload: string | string[]
): Promise<ApiResponseDetailArticle> => {
  return httpClient.get(`${ENDPOINT.GET_LIST_ARTICLES}/${payload}`);
};
