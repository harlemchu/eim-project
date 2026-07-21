// resources/js/Components/SearchFilter.tsx
import React from 'react';

interface SearchFilterProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    filterYear?: number;
    onFilterYearChange?: (year: number | null) => void;
    years: number[];
}

const SearchFilter: React.FC<SearchFilterProps> = ({
    searchTerm,
    onSearchChange,
    filterYear,
    onFilterYearChange,
    years,
}) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
                type="text"
                placeholder="Search by name or class..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <select
                value={filterYear || ''}
                onChange={(e) => onFilterYearChange?.(e.target.value ? Number(e.target.value) : null)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
                <option value="">All Years</option>
                {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                ))}
            </select>
        </div>
    );
};

export default SearchFilter;