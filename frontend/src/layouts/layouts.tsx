"use client";

import React, { useCallback, useMemo } from "react";
import Layout1 from "./layout1/layout1";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "@/stores/store";

interface LayoutsProps {
  children: React.ReactNode;
}

const Layouts = (props: LayoutsProps) => {
  const { children } = props;

  const renderLayout = useCallback(() => {
    return <Layout1>{children}</Layout1>;
  }, [children]);

  const renderLayouts = useMemo(() => {
    const queryClient = new QueryClient();

    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {renderLayout()}
        </QueryClientProvider>
      </Provider>
    );
  }, [renderLayout]);

  return renderLayouts;
};

export default Layouts;
