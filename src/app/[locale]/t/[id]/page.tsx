"use client";

import { redirect } from "next/navigation";

export default function T({ params }: { params: { id: string } }) {
  if (params.id) {
    if (localStorage) {
      localStorage.setItem("referralCode", params.id);
    }
  }
  redirect("/");
}
