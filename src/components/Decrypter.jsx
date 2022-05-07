import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { getDecryptedUrlFromDb } from '../dbinteract';

const Decrypter = () => {
    const launchDecrypter = (e) => {
        e.preventDefault();
        let key = document.querySelector('#key').value;
        if (key.value !== undefined || key.value !== '') {
            getDecryptedUrlFromDb();
        }
    };

    return (
        <div className="Decrypter flex flex-col h-fit rounded-lg dark:bg-gray-800 p-10">
            <p className="text-black dark:text-white font text-3xl lowercase font-logo tracking-wide">
                decrypter <FontAwesomeIcon icon={faKey} />
            </p>
            <p className="py-4 text-gray-300">
                Use this section to decrypt your given link before accessing it to view it's
                contents.
                <br />
                Remember all encryption and decryption is done strictly client-side.
            </p>
            <br />
            <br />
            <p className="Decrypter__decouple text-red-500 italic mb-12">
                Please decouple the session key <b>(token after the +)</b> from the generated
                shortened URL.
            </p>
            <form className="Squrl__decrypted-url-form rounded mb-4">
                <div className="dark:bg-gray-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <label
                        className="block text-gray-300 text-sm font-bold mb-2"
                        htmlFor="decrypted-url"
                    >
                        Encrypted URL
                    </label>
                    <input
                        className="Decrypter__decrypted-url-form--encrypted placeholder-slate-300 shadow appearance-none border rounded w-full py-3 px-3 mb-2 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="encrypted-url"
                        type="url"
                        placeholder="https://squrl.dev/Xf43D"
                    />
                    <p className="Decrypter__decrypted-url-form--error text-red-500 text-sm italic mt-2"></p>

                    <label
                        className="block text-gray-300 text-sm font-bold mb-2"
                        htmlFor="decrypted-url"
                    >
                        Session Key <i>(needed for decryption)</i>
                    </label>
                    <input
                        className="Decrypter__decrypted-url-form--key placeholder-slate-300 shadow appearance-none border rounded w-full py-3 px-3 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="key"
                        type="text"
                        placeholder="9f4a56"
                    />
                    <p
                        className="Decrypter__decrypted-url-form--error text-red-500 text-sm italic mt-2 mb-10"
                        id="#decrypter-error"
                    ></p>

                    <label
                        className="block text-gray-300 text-sm font-bold mb-2"
                        htmlFor="decrypted-url"
                    >
                        Decrypted URL Destination
                    </label>
                    <input
                        className="Decrypter__decrypted-url-form--decrypted cursor-default placeholder:text-gray-500 shadow appearance-none border rounded w-full py-3 px-3 
                    text-gray-50  dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                        id="decrypted-url"
                        type="url"
                        readOnly="readOnly"
                        placeholder="https://de.crypted.url/destination"
                    />
                    <p className="Decrypter__decrypted-url-form--error text-red-500 text-sm italic mt-2"></p>
                    <p className="text-gray-300 text-sm italic mt-2">
                        Be weary of navigating to unknown URL destinations!
                    </p>
                </div>
                <button
                    className="bg-teal-600 hover:bg-teal-500 text-gray-50 font-semibold w-full
                    py-2 px-4 border border-teal-200 rounded shadow"
                    onClick={(e) => launchDecrypter(e)}
                >
                    Decrypt URL 🔓
                </button>
            </form>
        </div>
    );
};
export default Decrypter;
