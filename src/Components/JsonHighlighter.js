import { Fragment } from "react";
import "./JsonHighlighter.css";

const TAB = "    ";

export function JsonHighlighter ({ data }) {
    return <div className="hl"><HighlightValue value={data} /></div>;
}

function HighlightValue ({ value }) {
    if (value === null) {
        return <span className="hl-null">null</span>;
    }

    if (Array.isArray(value)) {
        return (
            <>
                <span className="hl-punctuation">[</span>
                {
                    value.map((item, i, a) => (
                        <Fragment key={i}>
                            <HighlightValue value={item} />
                            { i < a.length - 1 ? <span className="hl-punctuation">,</span> : null }
                        </Fragment>
                    ))
                }
                <span className="hl-punctutation">]</span>
            </>
        );
    }

    if (typeof value === "object") {
       return (
           <>
            <span className="hl-punctuation">{"{"}</span>{"\n"}
            {
                Object.entries(value).map(([name, value], i, a) => (
                    <Fragment key={name}>
                        {TAB}
                        <span className="hl-punctuation">"</span>
                        <span className="hl-property">{name}</span>
                        <span className="hl-punctuation">"</span>
                        <span className="hl-punctuation">:</span>
                        {" "}
                        <HighlightValue value={value} />
                        { i < a.length - 1 ? <><span className="hl-punctuation">,</span>{"\n"}</> : null }
                    </Fragment>
                ))
            }
            {"\n"}
            <span className="hl-punctuation">{"}"}</span>
        </>
       );
    }

    if (typeof value === "string") {
        return (
            <>
                <span className="hl-punctuation">"</span>
                <span className="hl-string">{value}</span>
                <span className="hl-punctuation">"</span>
            </>
        );
    }

    if (typeof value === "number") {
        return <span className="hl-number">{value}</span>;
    }

    return null;
}