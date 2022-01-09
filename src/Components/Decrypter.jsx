import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { decryptUrl } from '../server/dbinteract';

const Decrypter = (props) => {
    return(
        <div className="Decrypter flex flex-col h-fit rounded-lg dark:bg-gray-800 p-8">
            <p className="text-black dark:text-white font text-2xl lowercase font-logo tracking-wide">tool_: Decrypter <FontAwesomeIcon icon={faKey} /></p>
            <p className="py-4 text-gray-300">Use this section to decrypt your given link before accessing it to view it's contents.
            <br />Remember all encryption and decryption is done client-side.</p>
            <form className="Squrl__decrypted-url-form shadow-md rounded mb-4">
                <div className="">
                    <label className="block text-gray-300 text-sm font-bold mb-3" htmlFor="decrypted-url">
                        Decrypted URL Destination
                    </label>
                    <input className="Decrypter__decrypted-url-form--input shadow appearance-none border rounded w-full py-3 px-3 
                    text-gray-50  dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline" 
                    id="decrypted-url" type="url" placeholder="https://"/>
                    <p className="Decrypter__decrypted-url-form--error text-red-500 text-sm italic mt-2"></p>
                    {/* These should be flipped around, with faArrowDown */}
                    <div className="flex justify-evenly mt-6 mb-6 text-white">
                        <FontAwesomeIcon icon={faArrowUp}/>
                        <FontAwesomeIcon icon={faArrowUp}/>
                        <FontAwesomeIcon icon={faArrowUp}/>
                    </div>
                    <label className="block text-gray-300 text-sm font-bold mb-3" htmlFor="decrypted-url">
                        Encrypted URL
                    </label>
                    <input className="Decrypter__decrypted-url-form--input shadow appearance-none border rounded w-full py-3 px-3 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="decrypted-url" type="url" placeholder="https://"/>
                    <p className="Decrypter__decrypted-url-form--error text-red-500 text-sm italic mt-2"></p>

                    <button className="bg-teal-600 hover:bg-teal-500 text-gray-50 font-semibold
                    py-2 px-4 mt-2 border border-teal-200 rounded shadow" onClick={() => decryptUrl()}>Decrypt URL 🔓</button>
                </div>
            </form>
        </div>
    );
}
export default Decrypter;