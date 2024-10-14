// Page.tsx

"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Filters, SelectedFilters, FilterOption } from "@/ui/explore/Filters";
import { Typography } from "@mui/material";
import "@/app/(main)/explore/explore.css";
import FilteredContentComponent from "@/ui/explore/FilteredContentComponent";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Define getInitialFilters function
  const getInitialFilters = (): SelectedFilters => {
    const jobTypes = searchParams.getAll('jobType');
    const appliedStatuses = searchParams.getAll('appliedStatus');
    const years = searchParams.getAll('year');

    return {
      jobTypes,
      appliedStatuses,
      years,
    };
  };

  const [filters, setFilters] = useState<SelectedFilters>(getInitialFilters());

  const handleFilterChange = (selectedFilters: SelectedFilters) => {
    setFilters(selectedFilters);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams();

    filters.jobTypes.forEach((value) => queryParams.append('jobType', value));
    filters.appliedStatuses.forEach((value) =>
      queryParams.append('appliedStatus', value)
    );
    filters.years.forEach((value) => queryParams.append('year', value));

    router.replace(`?${queryParams.toString()}`);
  }, [filters, router]);

  // Mock data for filter options
  const jobTypes: FilterOption[] = [
    { label: 'Full-Time', value: 'full-time' },
    { label: 'Part-Time', value: 'part-time' },
    { label: 'Internship', value: 'internship' },
  ];

  const appliedStatuses: FilterOption[] = [
    { label: 'Applied', value: 'applied' },
    { label: 'Not Applied', value: 'not-applied' },
  ];

  const years: FilterOption[] = [
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
  ];

  return (
    <div className="page-container">
      <div className="header-search-container">
        <div className="header-text">
          <Typography sx={{margin: "20px 0"}}><span style={{ fontWeight: "bold" }}>Explore</span> 321 Results</Typography>
          <Typography>Explore entry-level roles, discover the application pipeline,</Typography>
          <Typography>and talk to other applicants in the <span style={{ fontWeight: "bold"}}>company threads</span>.</Typography>
        </div>

      </div>
      <div className="card-filter-container">
        <div className="opportunity-column">
          {/* Render FilteredContentComponent here */}
          <FilteredContentComponent filters={filters} />
        </div>

        <div className="filter-column">
          <Typography variant="h6" style={{ marginBottom: "20px" }}>Filters</Typography>
          {/* Render Filters component here */}
          <Filters
            jobTypes={jobTypes}
            appliedStatuses={appliedStatuses}
            years={years}
            initialFilters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
}
