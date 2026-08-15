import { useState } from "react";


function UrlResult({ result }) {

    const [copied, setCopied] = useState(false);


    if (result.error) {

        return (

            <div className="error-box">

                ❌ {result.error}

            </div>

        );

    }


    const copyUrl = async () => {

        await navigator.clipboard.writeText(
            result.shortUrl
        );

        setCopied(true);


        setTimeout(() => {

            setCopied(false);

        }, 2000);

    };


    return (

        <div className="result-card">

            <div className="result-header">

                <div>

                    <span className="success-icon">

                        ✓

                    </span>

                    <span>

                        Your short URL is ready!

                    </span>

                </div>

            </div>


            <div className="short-url-box">

                <a
                    href={result.shortUrl}
                    target="_blank"
                    rel="noreferrer"
                >

                    {result.shortUrl}

                </a>


                <button
                    onClick={copyUrl}
                >

                    {copied ? "✓ Copied" : "Copy"}

                </button>

            </div>


            <div className="original-url">

                <span>

                    Original:

                </span>

                <p>

                    {result.originalUrl}

                </p>

            </div>

        </div>

    );

}


export default UrlResult;