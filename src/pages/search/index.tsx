import SearchQuery from "@/components/pages/search";
import { useGetSessionId } from "@/hooks/api/auth";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";

const Search = () => {
  const { mutateAsync: getSessionId } = useGetSessionId();
  const router = useRouter();

  const handleGetSessionid = async () => {
    try {
      localStorage.removeItem("queries");
      const res = await getSessionId();
      console.log(res);
      router.replace(`/search/${res.data.session_id}`);
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    }
  };

  React.useEffect(() => {
    handleGetSessionid();
  }, []);
  return <SearchQuery session_id={undefined} />;
};

export default Search;