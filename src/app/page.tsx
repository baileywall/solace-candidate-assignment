"use client";

import { useDebounce } from "@/util/hooks/useDebounce";
import { useFetchAdvocates } from "@/util/hooks/useFetchAdvocates";
import { useState } from "react";
import parsePhoneNumber from "libphonenumber-js";

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
    <main className="m-12">
      <h1 className="text-4xl">Solace Advocates</h1>
      <br />
      <br />
      <div className="flex space-x-4">
        <p>Search for an Advocate:</p>
        <input
          className="border border-solid border-black"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <br />
      <br />
      <table className="border border-solid border-black w-full">
        <thead>
          <tr className="border border-solid border-black">
            <th className="px-4 border border-slate-500">First Name</th>
            <th className="px-4 border border-slate-500">Last Name</th>
            <th className="px-4 border border-slate-500">City</th>
            <th className="px-4 border border-slate-500">Degree</th>
            <th className="px-4 border border-slate-500">Specialties</th>
            <th className="px-4 border border-slate-500">
              Years of Experience
            </th>
            <th className="px-4 border border-slate-500">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate, index) => {
            return (
              <tr
                className={index % 2 === 1 ? "bg-slate-300" : "bg-slate-100"}
                key={`advocate-table-row-${advocate.firstName}-${advocate.lastName}`}
              >
                <td className="px-4 border border-slate-500">
                  {advocate.firstName}
                </td>
                <td className="px-4 border border-slate-500">
                  {advocate.lastName}
                </td>
                <td className="px-4 border border-slate-500">
                  {advocate.city}
                </td>
                <td className="px-4 border border-slate-500">
                  {advocate.degree}
                </td>
                <td className="px-4 border border-slate-500">
                  {advocate.specialties?.map((s) => (
                    <div key={`advocate-speciality-${s}`}>{s}</div>
                  ))}
                </td>
                <td className="px-4 border border-slate-500">
                  {advocate.yearsOfExperience}
                </td>
                <td className="px-4 border border-slate-500">
                  {advocate.phoneNumber
                    ? parsePhoneNumber(
                        "+1" + advocate.phoneNumber.toString()
                      )?.formatNational()
                    : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pt-4 w-full justify-center flex space-x-4">
        {totalCount > 0
          ? Array(Math.ceil(totalCount / LIMIT))
              .fill("")
              .map((_, index) => {
                return (
                  <button
                    onClick={() => {
                      setPage(index);
                    }}
                    className={`w-8 border border-slate-500 rounded-md ${
                      page === index ? "bg-slate-300" : ""
                    }`}
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
