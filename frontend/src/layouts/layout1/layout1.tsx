"use client";

import ResponsiveAppBar from "@/components/AppBar/AppBar";
import PopularBlogs from "@/components/PopularBlogs/PopularBlogs";
import { Container, Stack } from "@mui/material";
import React from "react";

interface Layout1Props {
  children: React.ReactNode;
}

const Layout1 = (props: Layout1Props) => {
  const { children } = props;

  return (
    <>
      <ResponsiveAppBar />

      <Container maxWidth="xl">
        <Stack flexDirection="row" my={2} sx={{ width: "100%" }}>
          <Stack sx={{ width: "80%" }}>{children}</Stack>

          <Stack sx={{ width: "20%" }}>
            <PopularBlogs />
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Layout1;
