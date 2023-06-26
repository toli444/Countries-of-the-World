import React, {ReactNode, memo} from "react";

type FilterPanelProps = {
    label: string
    htmlFor: string,
    children: ReactNode,
};

function FilterPanel({ label, htmlFor, children }: FilterPanelProps) {
    return (
        <form className="filter-panel">
            <div className="filter-panel-content">
                <label htmlFor={htmlFor}>{label}</label>
                {children}
            </div>
        </form>
    )
}

export default FilterPanel;
