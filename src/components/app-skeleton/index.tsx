import React from "react";

function Skeleton() {
    return (
        <main className="main">
            <div className="filter-panel">
                <div className="filter-panel-content">
                    <div className="label-skeleton">Loading</div>
                    <div className="input-skeleton">
                        Loading...
                    </div>
                </div>
            </div>
            <div className="countries-list">
                <ul role="presentation">
                    {[1, 2, 3].map(c => (
                        <li data-testid="country-info" key={c}>
                            <dl style={{visibility: 'hidden'}} className="country-info">
                                <dt>Name</dt>
                                <dd></dd>
                                <dt>Owner</dt>
                                <dd></dd>
                                <dt>Languages</dt>
                                <dd></dd>
                            </dl>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default Skeleton;
