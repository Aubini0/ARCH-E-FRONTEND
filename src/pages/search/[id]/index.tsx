import SearchQuery from "@/components/pages/search";
import { useRouter } from "next/router";
import React from "react";

const Search = () => {
  const router = useRouter();
  const session_id = router.query.id as string;
  return <SearchQuery session_id={session_id} />;
};

export default Search;
