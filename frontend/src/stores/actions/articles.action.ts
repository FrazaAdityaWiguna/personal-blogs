"use client";

import { createAction } from "@reduxjs/toolkit";
import { REDUCER } from "../constant/constant";
import { ResponseListArticlesType } from "@/types/articles";

export const setDataListArticles = createAction<ResponseListArticlesType>(
  REDUCER.SET_LIST_ARTICLES
);
export const getListArticles = createAction(REDUCER.GET_LIST_ARTICLES);
