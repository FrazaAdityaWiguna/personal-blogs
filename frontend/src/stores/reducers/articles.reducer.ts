"use client";

import { createReducer } from "@reduxjs/toolkit";
import { setDataListArticles } from "../actions/articles.action";
import { ResponseListArticlesType } from "@/types/articles";

interface initialStateProps {
  listArticles?: ResponseListArticlesType;
}

const initialState: initialStateProps = {};

export const ArticleReducer = createReducer(initialState, (builder) => {
  builder.addCase(setDataListArticles, (state, { payload }) => {
    return {
      ...state,
      listArticles: payload,
    };
  });
});
