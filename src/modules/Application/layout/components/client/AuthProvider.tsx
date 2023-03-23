"use client";
import { SessionProvider } from "next-auth/react";

/**
 * interface
 */
export interface AuthContextProps {
  children: React.ReactNode;
}

/**
 * AuthProvider
 * @param children
 * @constructor
 */
const AuthProvider = ({ children }: AuthContextProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
