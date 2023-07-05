import React, { Component } from "react";
import { useRouter } from "next/router";
import { useCurrentUser } from "../hooks/auth/useCurrentUser";

export default function Home () {
  const router = useRouter();
  const { user: currentUser } = useCurrentUser();
  if (currentUser) {
    router.push("/genre-classifier");
  }
  else {
    router.push("/login");
  }
  
  return <div />;
}
