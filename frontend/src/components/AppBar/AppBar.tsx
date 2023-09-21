"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import { IconButton, InputBase, Stack, alpha, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Link from "next/link";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

function ResponsiveAppBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = searchParams.get("q") || "";

  const [searchValue, setsearchValue] = useState<string>("");

  const onSearch = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const inputElement = e.target as HTMLInputElement;
        const value = inputElement.value;
        router.push(`/search?q=${value}`);
      }
    },
    [router]
  );

  useEffect(() => {
    setsearchValue(params);
  }, [params]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Stack
          py={2}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack flexDirection="row">
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography>Blogs</Typography>
          </Stack>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setsearchValue(e.target.value)}
              onKeyDown={onSearch}
              value={searchValue}
            />
          </Search>

          <Stack flexDirection="row">
            <IconButton
              aria-label="Home"
              sx={{ color: "#fff" }}
              component={Link}
              href="/"
            >
              <HomeRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
