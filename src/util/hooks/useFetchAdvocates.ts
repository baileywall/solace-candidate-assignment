import { useMemo, useState } from "react";
import { ADVOCATE } from "../types";

export function useFetchAdvocates(
  limit: number,
  offset: number,
  searchTerm?: string
): { advocates: ADVOCATE[]; totalCount: number } {
  const [advocates, setAdvocates] = useState<ADVOCATE[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useMemo(() => {
    fetch(
      "/api/advocates?" +
        new URLSearchParams({
          limit: limit.toString(),
          offset: offset.toString(),
          searchTerm: searchTerm ?? "",
        })
    ).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data.advocates);
        setTotalCount(Number(jsonResponse.data.totalCount));
      });
    });
  }, [searchTerm, limit, offset]);

  return { advocates, totalCount };
}
