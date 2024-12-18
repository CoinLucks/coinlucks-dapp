"use client";

import AccountPage from "@/components/_Account";
import Layout from "@/components/Layout";

export default function AccountProfile(props: { params: { id: string } }) {
  return <Layout back={true}> <AccountPage id={props.params.id} /></Layout>;
}
