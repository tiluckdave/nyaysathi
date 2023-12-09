import { useState } from 'react';

export default function FileSummarize() {
    // save the file in directory 
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState(null);
    const onFileChanged = (event) => {
        setFile(event.target.files[0]);
    };

    // send the file to flask server
    const uploadFile = () => {
        const formData = new FormData();
        formData.append("file", file);

        fetch("https://nyaysathi.replit.app/summarize", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
                setSummary(result.summary);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <h1>File Summarize</h1>
            <input type="file" onChange={onFileChanged} />
            <button onClick={uploadFile}>Summarize</button>

            <div>
                {summary}
            </div>
        </div>
    )
}