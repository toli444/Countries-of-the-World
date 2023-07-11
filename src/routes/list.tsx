import React from 'react';
import {useSearchParams} from "react-router-dom";
import { ViewportList } from 'react-viewport-list';
import {useCountries} from "./root";
import FilterPanel from "../components/filter-panel";
import memoize from "../utils/memoize";
import getHighlightedText from "../utils/getHighlightedText";
import normalizeStringForSearch from "../utils/normalizeStringForSearch";
import {Country} from "../types/Country";

const getCountriesForSearch = memoize((countries: Country[]) => {
    return countries.map(c => ({ ...c, searchString: normalizeStringForSearch(c.name) }))
});

function List() {
    const countries = useCountries();
    const [searchParams, setSearchParams] = useSearchParams();
    const countriesForSearch = getCountriesForSearch(countries);
    const nameFilterValue = searchParams.get('name') || '';
    const filteredCountries = countriesForSearch.filter(c => c.searchString.includes(normalizeStringForSearch(nameFilterValue)));

    return (
        <main>
            <FilterPanel label="Filter by name" htmlFor="filter-by-name-input">
                <input
                    id="filter-by-name-input"
                    type="text"
                    placeholder="type name"
                    value={nameFilterValue}
                    onChange={e => setSearchParams({ name: e.target.value })}
                />
            </FilterPanel>
            <div className="countries-list">
                {filteredCountries.length ? (
                    <ul>
                        <ViewportList
                            items={filteredCountries}
                            initialPrerender={5}
                            renderSpacer={({ ref, style }) => <li ref={ref} style={style} role="presentation" />}
                        >
                            {(country, index) => (
                                <li data-testid="country-info" key={country.name} aria-setsize={filteredCountries.length} aria-posinset={index + 1}>
                                    <dl className="country-info">
                                        <dt>Name</dt>
                                        <dd data-testid="country-name">{getHighlightedText(country.name, nameFilterValue)}</dd>
                                        <dt>Continent</dt>
                                        <dd data-testid="country-owner">{country.continent}</dd>
                                        <dt>Languages</dt>
                                        <dd data-testid="country-languages">{country.languages.join(', ')}</dd>
                                    </dl>
                                </li>
                            )}
                        </ViewportList>
                    </ul>
                ) : <p data-testid="no-results-message">No countries match the specified name.</p>}
            </div>
        </main>
    );
}

export default List;
