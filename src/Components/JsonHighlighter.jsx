import { Fragment } from "react";
import "./JsonHighlighter.css";

const TAB = "    ";

export function JsonHighlighter ({ data }) {
    return <div className="hl"><HighlightValue value={data} /></div>;
}

function HighlightValue ({ value, depth = 0 }) {
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
                            {typeof item === "object"?"\n"+TAB.repeat(depth + 1):null}
                            <HighlightValue value={item} depth={depth+(typeof item === "object"?1:0)} />
                            { i < a.length - 1 ? <span className="hl-punctuation">,</span> : (typeof item === "object"?"\n"+TAB.repeat(depth):null) }
                        </Fragment>
                    ))
                }
                <span className="hl-punctutation">]</span>
            </>
        );
    }

    if (typeof value === "object") {
        if (typeof value.toJSON === "function") {
            return <HighlightValue value={value.toJSON()} />;
        }

        const tabDepth = TAB.repeat(depth);

        return (
            <>
                <span className="hl-punctuation">{"{"}</span>{"\n"}
                {
                    Object.entries(value).map(([name, value], i, a) => (
                        <Fragment key={name}>
                            {tabDepth}
                            {TAB}
                            <span className="hl-punctuation">"</span>
                            <span className="hl-property">{name}</span>
                            <span className="hl-punctuation">"</span>
                            <span className="hl-punctuation">:</span>
                            {" "}
                            <HighlightValue value={value} depth={depth+1} />
                            { i < a.length - 1 ? <><span className="hl-punctuation">,</span>{"\n"}</> : null }
                        </Fragment>
                    ))
                }
                {"\n"}
                {tabDepth}
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

    if (typeof value === "boolean") {
        return <span className="hl-boolean">{value?"true":"false"}</span>;
    }

    return null;
}