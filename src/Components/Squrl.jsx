import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

const Squrl = () => {

    const parseUrl = () => {
        console.log(`Parsing information for: ${document.querySelector('#url').value}`);
    }

    return(
        <div className="Squrl flex flex-col">
            <p className="text-black dark:text-white font text-4xl lowercase font-logo tracking-wide">Squrl <FontAwesomeIcon icon={faKey} /></p>
            <p className="Squrl__about py-4 text-gray-300">
                Squrl, <a href="https://github.com/justin-carver/squrl" className="text-gray-400 underline underline-offset-4">
                    Secure Quick URL</a>, is a modern URL shortener with end-to-end encryption for a more secure transfer of information.<br/>
                    There are multiple points of encryption along the route.
            </p>
            <form className="Squrl__url-form bg-white dark:bg-gray-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2" for="url">
                        URL for encryption
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-3 px-3 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="url" type="url" placeholder="https://mysecretwebsite.com/private" />
                </div>
                <label className="Squrl__output block text-gray-300 text-sm font-bold mb-2" for="output">
                    Shortened URL
                </label>
                <input className="bg-gray-400 dark:bg-gray-800 shadow appearance-none border rounded w-full py-3 px-3 
                    text-gray-100 leading-tight" 
                    id="output" type="url" placeholder="encrypted URL" readOnly="readOnly" value="https://squrl.dev/Xf43D"/>
                <p className="text-gray-300 text-sm italic mt-2">* Make sure to include <span className="font-bold">https://</span> within your URL for enhanced security.</p>
            </form>
            <button className="bg-teal-300 hover:bg-teal-500 text-gray-900 font-semibold
            py-2 px-4 border border-teal-200 rounded shadow" onClick={parseUrl}> Encrypt URL 🔐</button>
        </div>
    );
}

export default Squrl;