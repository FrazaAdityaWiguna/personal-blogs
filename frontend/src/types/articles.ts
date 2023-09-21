export type PaginationType = {
  page: number;
  pageCount: number;
  pageSize: number;
  totalPages: number;
};

export type DataListArticleType = {
  attributes: {
    Description: string;
    Title: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
    views: number;
  };
  id: number;
};

export type ResponseListArticlesType = {
  data: DataListArticleType[];
  meta: {
    pagination: PaginationType;
  };
};

export type ApiResponseListArticlesType = {
  data: ResponseListArticlesType;
};

export type ResponseDetailArticle = {
  data: DataListArticleType;
  meta: object;
};

export type ApiResponseDetailArticle = {
  data: ResponseDetailArticle;
};
