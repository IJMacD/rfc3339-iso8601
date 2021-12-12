import { useState } from 'react';
import { downloadFile } from './downloadFile';
import { formatAuto } from './format';
import { date as date_formats, time as time_formats, dateTime as date_time_formats } from './formats';

export function DownloadTestFile ({ now, showHTML }) {
    const [ testFileType, setTestFileType ] = useState("union");
    const [ testFileISO, setTestFileISO ] = useState(true);
    const [ testFileRFC, setTestFileRFC ] = useState(true);
    const [ testFileHTML, setTestFileHTML ] = useState(showHTML);

    const formatCount = (testFileRFC ? 1 : 0) + (testFileISO ? 1 : 0) + (testFileHTML && showHTML ? 1 : 0);

    function handleDownload () {

        if (formatCount === 0) return;

        let df;
        let tf;
        let dtf;

        let filename = "date-test-values";

        if (formatCount === 1) {
            let filter;

            if (testFileRFC) {
                filter = f => f.rfc;
                filename += "-rfc";
            } else if (testFileISO) {
                filter = f => f.iso;
                filename += "-iso";
            } else if (testFileHTML) {
                filter = f => f.html;
                filename += "-html";
            }

            df = date_formats.filter(filter);
            tf = time_formats.filter(filter);
            dtf = date_time_formats.filter(filter);
        }
        else  if (testFileType === "intersection") {
            let rfcBypass = true;
            let isoBypass = true;
            let htmlBypass = true;

            let name = [];

            if (testFileRFC) {
                name.push("rfc");
                rfcBypass = false;
            }
            if (testFileISO) {
                name.push("iso");
                isoBypass = false;
            }
            if (testFileHTML) {
                name.push("html");
                htmlBypass = false;
            }

            filename += "-" + name.join("_∩_");

            const filter = f => ((f.rfc || rfcBypass) && (f.iso || isoBypass) && (f.html || htmlBypass));

            df = date_formats.filter(filter);
            tf = time_formats.filter(filter);
            dtf = date_time_formats.filter(filter);

        } else {

            let rfcRequired = false;
            let isoRequired = false;
            let htmlRequired = false;

            let name = [];

            if (testFileRFC) {
                name.push("rfc");
                rfcRequired = true;
            }
            if (testFileISO) {
                name.push("iso");
                isoRequired = true;
            }
            if (testFileHTML) {
                name.push("html");
                htmlRequired = true;
            }

            filename += "-" + name.join("_∪_");

            const filter = f => ((f.rfc && rfcRequired) || (f.iso && isoRequired) || (f.html && htmlRequired));

            df = date_formats.filter(filter);
            tf = time_formats.filter(filter);
            dtf = date_time_formats.filter(filter);
        }

        const str = [];

        str.push("# Dates");
        str.push(...df.map(f => formatAuto(f.format, now)));

        str.push("# Times");
        str.push(...tf.map(f => formatAuto(f.format, now)));

        str.push("# Date-Times");
        str.push(...dtf.map(f => formatAuto(f.format, now)));

        filename += ".txt";

        downloadFile(str.join("\n"), filename);
    }

    return (
        <div>
            <h2>Test File Generator</h2>
            <p>
                <button onClick={() => handleDownload()} disabled={formatCount === 0}>Download test file</button>
                <label><input type="checkbox" name="test-file-includes" value="rfc3339" checked={testFileRFC} onChange={e => setTestFileRFC(e.target.checked)} />RFC 3339</label>
                <label><input type="checkbox" name="test-file-includes" value="iso8601" checked={testFileISO} onChange={e => setTestFileISO(e.target.checked)} />ISO 8601</label>
                { showHTML && <label><input type="checkbox" name="test-file-includes" value="html" checked={testFileHTML} onChange={e => setTestFileHTML(e.target.checked)} />HTML</label> }
                {
                    formatCount > 1 &&
                    <>
                        <label><input type="radio" name="test-file-includes" value="union" checked={testFileType === "union"} onChange={e => setTestFileType(e.target.value)} />Union</label>
                        <label><input type="radio" name="test-file-includes" value="intersection" checked={testFileType === "intersection"} onChange={e => setTestFileType(e.target.value)} />Intersection</label>
                    </>
                }
            </p>
        </div>
    );
}