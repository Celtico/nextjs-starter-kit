"use client";
import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

/**
 * ThemeProvider
 * @param props
 * @constructor
 */
const ThemeProvider = (props: ThemeProviderProps) => (
  <NextThemesProvider {...props} />
);

export default ThemeProvider;
