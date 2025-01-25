"use client";

import { useDebounce } from "@/util/hooks/useDebounce";
import { useFetchAdvocates } from "@/util/hooks/useFetchAdvocates";
import { useState } from "react";

const LIMIT = 10;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 1);

  const [page, setPage] = useState(0);
  const { advocates, totalCount } = useFetchAdvocates(
    LIMIT,
    page * LIMIT,
    debouncedSearchTerm
  );

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <input
          style={{ border: "1px solid black" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate) => {
            return (
              <tr
                key={`advocate-table-row-${advocate.firstName}-${advocate.lastName}`}
              >
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties?.map((s) => (
                    <div key={`advocate-speciality-${s}`}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        {totalCount > 0
          ? Array(Math.ceil(totalCount / LIMIT))
              .fill("")
              .map((_, index) => {
                return (
                  <button
                    onClick={() => {
                      setPage(index);
                    }}
                    style={{
                      width: "50px",
                      border: "1px solid black",
                      backgroundColor: page === index ? "gray" : "",
                    }}
                    key={`pagination-button-${index}`}
                  >
                    {index + 1}
                  </button>
                );
              })
          : null}
      </div>
    </main>
  );
}
