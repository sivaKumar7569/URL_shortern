import { useState } from "react";


function UrlForm({ onSubmit, loading }) {

    const [url, setUrl] = useState("");


    const handleSubmit = (event) => {

        event.preventDefault();


        if (!url.trim()) {

            return;

        }


        onSubmit(url);


    };


    return (

        <form
            className="url-form"
            onSubmit={handleSubmit}
        >

            <div className="input-wrapper">

                <span className="input-icon">

                    🔗

                </span>


                <input
                    type="url"
                    placeholder="Paste your long URL here..."
                    value={url}
                    onChange={(e) =>
                        setUrl(e.target.value)
                    }
                    required
                />

            </div>


            <button
                type="submit"
                disabled={loading}
            >

                {loading ? (

                    <>
                        <span className="spinner"></span>
                        Creating...
                    </>

                ) : (

                    <>
                        Shorten URL →
                    </>

                )}

            </button>

        </form>

    );

}


export default UrlForm;