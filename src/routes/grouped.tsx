import React from 'react';
import {useSearchParams} from "react-router-dom";
import { ViewportList } from 'react-viewport-list';
import {useCountries} from "./root";
import groupBy from "lodash.groupby";
import FilterPanel from "../components/filter-panel";
import memoize from "../utils/memoize";
import {Country} from "../types/Country";

const getLanguages = memoize((countries: Country[]) =>
    Array.from(new Set(countries
        .flatMap(r => r.languages)))
        .sort((a, b) => a.localeCompare(b)));

function Grouped() {
    const countries = useCountries();
    const [searchParams, setSearchParams] = useSearchParams();
    const languageFilter = searchParams.get('lang') || '';
    const languages = getLanguages(countries);
    const filteredCountries = languageFilter ?
        countries.filter(r => r.languages.includes(languageFilter)) :
        countries;
    const groupedFilteredCountries = groupBy(filteredCountries, 'continent');

    return (
        <main>
            <FilterPanel label="Filter by language" htmlFor="filter-by-language-select">
                <select
                    id="filter-by-language-select"
                    value={languageFilter} onChange={e => setSearchParams({ lang: e.target.value})}
                >
                    <option value="">Choose a language</option>
                    {languages.map(l => (
                        <option key={l} value={l}>{l}</option>
                    ))}
                </select>
            </FilterPanel>
            <div className="countries-list">
                {Object.entries(groupedFilteredCountries).map(([continent, continentCountries]) => (
                    <section
                        key={continent}
                        className="continent-countries"
                        data-testid="country-info"
                    >
                        <h2 className="continent-name" data-testid="country-continent">
                            <span className="screen-reader-text">Continent: </span>
                            {continent}
                        </h2>
                        <ul>
                            <ViewportList
                                items={continentCountries}
                                initialPrerender={5}
                                renderSpacer={({ ref, style }) => <li ref={ref} style={style} role="presentation" />}
                            >
                                {(country, index) => (
                                    <li key={country.name} aria-setsize={continentCountries.length} aria-posinset={index + 1}>
                                        <dl className="country-info">
                                            <dt>Name</dt>
                                            <dd data-testid="country-name">{country.name}</dd>
                                            <dt>Languages</dt>
                                            <dd data-testid="country-languages">{country.languages.join(', ')}</dd>
                                        </dl>
                                    </li>
                                )}
                            </ViewportList>
                        </ul>
                    </section>
                ))}
            </div>
        </main>
    );
}

export default Grouped;
