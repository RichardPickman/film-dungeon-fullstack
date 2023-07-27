"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const client = new QueryClient();

interface Props {
  children: ReactNode;
}
export const QueryProvider = ({ children }: Props) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
