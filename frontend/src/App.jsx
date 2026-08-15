import React, { useState, useEffect } from "react";


const API_URL = "http://localhost:5000";


function App() {

    const [url, setUrl] = useState("");

    const [result, setResult] = useState(null);

    const [urls, setUrls] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [copied, setCopied] = useState(false);


    // ========================================
    // GET RECENT URLS
    // ========================================

    const fetchUrls = async () => {

        try {

            const response = await fetch(
                `${API_URL}/api/urls`
            );

            const data =
                await response.json();


            if (data.success) {

                setUrls(data.urls);

            }

        } catch (error) {

            console.error(
                "Fetch URLs error:",
                error
            );

        }

    };


    // ========================================
    // LOAD URLS WHEN PAGE OPENS
    // ========================================

    useEffect(() => {

        fetchUrls();

    }, []);


    // ========================================
    // SHORTEN URL
    // ========================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        setError("");

        setResult(null);

        setCopied(false);


        if (!url.trim()) {

            setError(
                "Please enter a URL"
            );

            return;

        }


        try {

            setLoading(true);


            const response = await fetch(

                `${API_URL}/api/shorten`,

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        longUrl: url

                    })

                }

            );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(

                    data.message ||
                    "Failed to shorten URL"

                );

            }


            setResult(data);

            setUrl("");


            // Refresh recent URLs

            fetchUrls();


        } catch (error) {

            console.error(error);

            setError(
                error.message
            );

        } finally {

            setLoading(false);

        }

    };


    // ========================================
    // COPY URL
    // ========================================

    const handleCopy = async () => {

        if (!result?.shortUrl) {

            return;

        }


        try {

            await navigator.clipboard.writeText(

                result.shortUrl

            );


            setCopied(true);


            setTimeout(() => {

                setCopied(false);

            }, 2000);

        } catch (error) {

            console.error(
                "Copy failed:",
                error
            );

        }

    };


    // ========================================
    // UI
    // ========================================

    return (

        <div className="app">


            {/* HEADER */}

            <header className="header">

                <div className="header-container">


                    <div className="logo">

                        <div className="logo-icon">

                            🔗

                        </div>

                        <span>

                            Shortly

                        </span>

                    </div>


                    <div className="status">

                        <span
                            className="status-dot"
                        ></span>

                        API Online

                    </div>


                </div>

            </header>



            {/* MAIN */}

            <main className="main-container">


                {/* HERO */}

                <section className="hero">


                    <div className="badge">

                        ⚡ Fast & Simple

                    </div>


                    <h1>

                        Shorten your URLs

                    </h1>


                    <p>

                        Create short,
                        memorable links
                        in seconds.

                    </p>


                </section>



                {/* FORM */}

                <form
                    className="url-form"
                    onSubmit={handleSubmit}
                >


                    <div className="input-container">


                        <span className="link-icon">

                            🔗

                        </span>


                        <input

                            type="url"

                            placeholder=
                                "Paste your long URL here..."

                            value={url}

                            onChange={(event) =>
                                setUrl(
                                    event.target.value
                                )
                            }

                            required

                        />


                    </div>



                    <button

                        type="submit"

                        disabled={loading}

                    >

                        {loading

                            ? "Creating..."

                            : "Shorten URL →"

                        }

                    </button>


                </form>



                {/* ERROR */}

                {error && (

                    <div className="error">

                        ❌ {error}

                    </div>

                )}



                {/* RESULT */}

                {result && (

                    <section className="result">


                        <div className="result-title">


                            <span
                                className=
                                    "success-icon"
                            >

                                ✓

                            </span>


                            Your short URL
                            is ready!


                        </div>



                        <div className="short-url">


                            <a

                                href={
                                    result.shortUrl
                                }

                                target="_blank"

                                rel="noreferrer"

                            >

                                {result.shortUrl}

                            </a>


                            <button

                                onClick={handleCopy}

                            >

                                {copied

                                    ? "✓ Copied"

                                    : "Copy"

                                }

                            </button>


                        </div>



                        <div className="original">


                            <strong>

                                Original URL

                            </strong>


                            <p>

                                {result.originalUrl}

                            </p>


                        </div>


                    </section>

                )}



                {/* RECENT URLS */}

                <section className="recent">


                    <div className="recent-header">


                        <h2>

                            Recent URLs

                        </h2>


                        <span>

                            {urls.length} links

                        </span>


                    </div>



                    {urls.length === 0 ? (


                        <div className="empty">

                            No URLs created yet.

                        </div>


                    ) : (


                        <div className="url-list">


                            {urls.map((item) => (


                                <div

                                    className="url-card"

                                    key={item._id}

                                >


                                    <div className="url-icon">

                                        🔗

                                    </div>



                                    <div className="url-details">


                                        <a

                                            href={
                                                `${API_URL}/${item.shortCode}`
                                            }

                                            target="_blank"

                                            rel="noreferrer"

                                        >

                                            {item.shortCode}

                                        </a>


                                        <p>

                                            {item.longUrl}

                                        </p>


                                    </div>



                                    <div className="clicks">


                                        <strong>

                                            {item.clicks}

                                        </strong>


                                        <span>

                                            clicks

                                        </span>


                                    </div>


                                </div>


                            ))}


                        </div>

                    )}


                </section>


            </main>



            {/* FOOTER */}

            <footer>

                URL Shortener

                <span> • </span>

                React + Node.js + MongoDB

            </footer>


        </div>

    );

}


export default App;