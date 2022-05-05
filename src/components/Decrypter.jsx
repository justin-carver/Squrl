import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { getDecryptedUrlFromDb } from '../dbinteract';

const Decrypter = () => {

    const launchDecrypter = (e) => {
        e.preventDefault();
        let key = document.querySelector('#key').value;
        if (key.value !== undefined || key.value !== '') {
            getDecryptedUrlFromDb();
        }
    }

    return(
        <div className="Decrypter flex flex-col h-fit rounded-lg dark:bg-gray-800 p-8">
            <p className="text-black dark:text-white font text-4xl lowercase font-logo tracking-wide">decrypter <FontAwesomeIcon icon={faKey} /></p>
            <p className="py-4 text-gray-300">Use this section to decrypt your given link before accessing it to view it's contents.
            <br />Remember all encryption and decryption is done strictly client-side.</p>
            <br />
            <p className="Decrypter__decouple text-red-500 italic mb-8">Please remember to decouple the session key from the encrypted URL.</p>
            <form className="Squrl__decrypted-url-form rounded mb-4">
                <div className="hmm">
                    <label className="block text-gray-300 text-sm font-bold mb-3" htmlFor="decrypted-url">
                        Encrypted URL
                    </label>
                    <input className="Decrypter__decrypted-url-form--encrypted placeholder-slate-300 shadow appearance-none border rounded w-full py-3 px-3 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="encrypted-url" type="url" placeholder="https://squrl.dev/Xf43D"/>
                    <p className="Decrypter__decrypted-url-form--error text-red-500 text-sm italic mt-2"></p>

                    <label className="block text-gray-300 text-sm font-bold mb-3" htmlFor="decrypted-url">
                        Session Key <i>(needed for decryption)</i>
                    </label>
                    <input className="Decrypter__decrypted-url-form--key placeholder-slate-300 shadow appearance-none border rounded w-full py-3 px-3 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="key" type="text" placeholder="9f4a56"/>
                    <p className="Decrypter__decrypted-url-form--error text-red-500 text-sm italic mt-2" id="#decrypter-error"></p>

                    <div className="flex justify-evenly mt-6 mb-6 text-white">
                        <FontAwesomeIcon icon={faArrowDown}/>
                        <FontAwesomeIcon icon={faArrowDown}/>
                        <FontAwesomeIcon icon={faArrowDown}/>
                    </div>

                    <label className="block text-gray-300 text-sm font-bold mb-3" htmlFor="decrypted-url">
                        Decrypted URL Destination
                    </label>
                    <input className="Decrypter__decrypted-url-form--decrypted cursor-default placeholder:text-gray-500 shadow appearance-none border rounded w-full py-3 px-3 
                    text-gray-50  dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline" 
                    id="decrypted-url" type="url" readOnly="readOnly" placeholder="https://de.crypted.url/destination"/>
                    <p className="Decrypter__decrypted-url-form--error text-red-500 text-sm italic mt-2"></p>

                    <button className="bg-teal-600 hover:bg-teal-500 text-gray-50 font-semibold
                    py-2 px-4 mt-2 border border-teal-200 rounded shadow" onClick={(e) => launchDecrypter(e)}>Decrypt URL 🔓</button>
                    <div className="Decrypter__notice italic text-white/40 mt-6">
                        <p>NOTICE: By decrypting this link, and utilizing this service, you are agreeing to the Terms of Service; https://squrl.dev and maintainers are not responsible for any potential damage caused by unknown redirects. If you are unsure
                            about where a certain link leads, please proceed with caution.
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default Decrypter;