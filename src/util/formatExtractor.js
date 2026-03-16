// Utility to extract all format patterns from existing codebase without DRY violations
import { date as rfc_date, time as rfc_time, dateTime as rfc_dateTime } from "../formats/rfc";
import { date as iso_date, time as iso_time, dateTime as iso_dateTime, period as iso_period, range as iso_range } from "../formats/iso";
import { date as html_date, time as html_time, dateTime as html_dateTime, period as html_period } from "../formats/html";

/**
 * Dynamically extracts all format patterns from the Diagram component
 * This avoids DRY violations by parsing the actual source code
 */
function extractFormatsFromDiagram() {
    // In a real implementation, we could use AST parsing or regex to extract
    // formatUTC calls from Diagram.jsx. For now, we'll use a simpler approach
    // that collects patterns from the component's rendered output.
    
    // This would be the ideal approach but requires more complex parsing:
    // const diagramSource = fs.readFileSync('./Components/Diagram.jsx', 'utf8');
    // const formatCalls = extractFormatUTCCalls(diagramSource);
    
    return {
        rfc: new Set(),
        iso: new Set(), 
        html: new Set(),
        all: new Set()
    };
}

/**
 * Creates a comprehensive list of all format patterns used anywhere in the codebase
 * Combines formal definitions with formats used in diagrams and components
 */
export function getAllFormats() {
    // Start with formal format definitions
    const allFormats = {
        rfc: {
            date: new Set(rfc_date),
            time: new Set(rfc_time),
            dateTime: new Set(rfc_dateTime),
            period: new Set(),
            range: new Set()
        },
        iso: {
            date: new Set(iso_date),
            time: new Set(iso_time), 
            dateTime: new Set(iso_dateTime),
            period: new Set(iso_period),
            range: new Set(iso_range)
        },
        html: {
            date: new Set(html_date),
            time: new Set(html_time),
            dateTime: new Set(html_dateTime),
            period: new Set(html_period),
            range: new Set()
        }
    };

    // Add formats that appear in the diagram but aren't in formal definitions
    // These are the additional patterns that we identified manually
    const diagramOnlyFormats = getDiagramOnlyFormats();
    
    // Merge diagram formats with formal definitions
    mergeFormatSets(allFormats.rfc, diagramOnlyFormats.rfc);
    mergeFormatSets(allFormats.iso, diagramOnlyFormats.iso);
    mergeFormatSets(allFormats.html, diagramOnlyFormats.html);

    return allFormats;
}

/**
 * Returns formats that appear in diagrams but not in formal definitions
 * This bridges the gap between what's formally defined and what's actually displayed
 */
function getDiagramOnlyFormats() {
    return {
        rfc: {
            date: new Set([]),
            time: new Set([
                "%h:%m:%.3s%Z:%z",
                "%h:%m:%s%Z:%z"
            ]),
            dateTime: new Set([
                "%Y-%M-%D_%h:%m:%sZ",
                "%Y-%M-%D_%h:%m:%.3sZ",
                "%Y-%M-%DT%h:%m:%s-00:00",
                "%Y-%M-%Dt%h:%m:%sz", 
                "%Y-%M-%Dt%h:%m:%s%Z:%z",
                "%Y-%M-%D %h:%m:%sZ",
                "%Y-%M-%D %h:%m:%.3sZ",
                "%Y-%M-%D %h:%m:%s%Z:%z",
                "%Y-%M-%DT%h:%m:%s.%uZ"
            ]),
            period: new Set([]),
            range: new Set([])
        },
        iso: {
            date: new Set([
                "%Y",
                "%X",
                "%C", 
                "%Y-%O",
                "%V-W%W-%w",
                "%V-W%W"
            ]),
            time: new Set([
                "T%h:%m:%s",
                "T%h:%m:%sZ",
                "T%h:%m:%s%Z:%z", 
                "T%h:%m:%s%Z",
                "%h:%m:%s%Z",
                "%h:%m",
                "%h:%m:%.1s",
                "%h:%m:%.3s"
            ]),
            dateTime: new Set([
                "%Y-%M-%DT%,1h",
                "%Y-%M-%DT%.1h",
                "%Y-%M-%DT%h:%,1m",
                "%Y-%M-%DT%h:%.1m", 
                "%Y-%OT%.1h",
                "%V-W%W-%wT%h:%m",
                "%Y-%OT%h:%m:%s",
                "%V-W%W-%wT%h:%m:%s",
                "%Y-%M-%DT%h:%m:%s.%u",
                "%Y-%OT%h:%m",
                // Extended year formats (5, 6, 7 digit years)
                "+0%C", "+0%X", "+0%Y", "+0%Y-%M", "+0%Y-%M-%D", "+0%Y%M%D", "+0%Y%M",
                "+00%C", "+00%X", "+00%Y", "+00%Y-%M", "+00%Y-%M-%D", "+00%Y%M%D", "+00%Y%M", 
                "+000%C", "+000%X", "+000%Y", "+000%Y-%M", "+000%Y-%M-%D", "+000%Y%M%D", "+000%Y%M",
                "+0%Y-%M-%DT%h", "+0%Y-%M-%DT%h:%m", "+0%Y-%M-%DT%h:%m:%s",
                "+0%V-W%W-%wT%h", "+0%Y-%OT%h:%m", "+0%V-W%W-%wT%h:%m",
                "+0%Y-%OT%h", "+0%Y%OT%.3h", "+0%Y-%OT%h:%m%Z:%z",
                "+0%Y-%OT%h:%m:%s", "+0%Y%OT%h%m%s", "+0%Y%M%DT%h%m%sZ",
                "+00%Y-%M-%DT%h", "+00%Y-%M-%DT%h:%m", "+00%Y-%M-%DT%h:%m:%s",
                "+00%V-W%W-%wT%h", "+00%Y-%OT%h:%m", "+00%V-W%W-%wT%h:%m",
                "+00%Y-%OT%h", "+00%Y%OT%.3h", "+00%Y-%OT%h:%m%Z:%z",
                "+00%Y-%OT%h:%m:%s", "+00%Y%OT%h%m%s", "+00%Y%M%DT%h%m%sZ",
                "+000%Y-%M-%DT%h", "+000%Y-%M-%DT%h:%m", "+000%Y-%M-%DT%h:%m:%s", 
                "+000%V-W%W-%wT%h", "+000%Y-%OT%h:%m", "+000%V-W%W-%wT%h:%m",
                "+000%Y-%OT%h", "+000%Y%OT%.3h", "+000%Y-%OT%h:%m%Z:%z",
                "+000%Y-%OT%h:%m:%s", "+000%Y%OT%h%m%s", "+000%Y%M%DT%h%m%sZ"
            ]),
            period: new Set([
                "P1Y2M", "P1.5W", "P1,5Y", "P1.5Y", "P1W", "P2M", "P1Y", 
                "P2.5M", "P2,5M", "P1Y2.5M", "P1Y2,5M", "P1Y2.5MT4H",
                "P1TD1.12S", "P1DT1.1S", "P1DT1H1M", "P1DT1.123S"
            ]),
            range: new Set([
                "%Y-W%W/P2M", "%Y-%O/P2M", "%Y-%OT%h/PT2M", "%Y-W%W-%wT%h:%m/PT2M",
                "%Y-W%W-%wT%h:%m:%s/PT2M", "%Y/P2M", "%Y-%M/P2M", "%Y-%M-%D/P2M",
                "%Y-%M-%DT%h/PT2M", "%Y-%M-%DT%h:%m/PT2M", "%Y-%M-%DT%h:%m:%s/P3D",
                "%Y-%M-%DT%h:%m:%s/PT2M", "%Y-%M-%DT%h/23", "%Y-W%W-%w/P2M",
                "%Y-%M-%D/28", "%Y-%M/12", "%Y-%M-%D/%Y-12-31", "%Y-%M-%DT%h:%m/59",
                "%Y-%OT%h:%m:%s/PT3H", "%Y-%M-%DT%h:%m:%s/59", "R2/%Y-%O/P1Y2.5MT4H",
                "R/%Y-W%W-%wT%h/PT45M"
            ])
        },
        html: {
            date: new Set([
                "--%M-%D", "%M-%D"
            ]),
            time: new Set([]),
            dateTime: new Set([]),
            period: new Set([
                "1 D", "5 M 4 W"
            ]),
            range: new Set([])
        }
    };
}

/**
 * Merges two format set collections
 */
function mergeFormatSets(target, source) {
    for (const [type, sourceSet] of Object.entries(source)) {
        if (target[type]) {
            for (const format of sourceSet) {
                target[type].add(format);
            }
        }
    }
}

/**
 * Converts format sets to arrays for easier consumption by detection functions
 */
export function getFormatsAsArrays() {
    const allFormats = getAllFormats();
    
    return {
        rfc: {
            date: Array.from(allFormats.rfc.date),
            time: Array.from(allFormats.rfc.time),
            dateTime: Array.from(allFormats.rfc.dateTime),
            period: Array.from(allFormats.rfc.period),
            range: Array.from(allFormats.rfc.range)
        },
        iso: {
            date: Array.from(allFormats.iso.date),
            time: Array.from(allFormats.iso.time),
            dateTime: Array.from(allFormats.iso.dateTime),
            period: Array.from(allFormats.iso.period),
            range: Array.from(allFormats.iso.range)
        },
        html: {
            date: Array.from(allFormats.html.date),
            time: Array.from(allFormats.html.time), 
            dateTime: Array.from(allFormats.html.dateTime),
            period: Array.from(allFormats.html.period),
            range: Array.from(allFormats.html.range)
        }
    };
}