import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { decryptUrl } from '../dbinteract';
import cryptoJs from 'crypto-js';

const Decrypter = () => {

    const launchDecrypter = (e) => {
        e.preventDefault();
        let encryptedUrl = document.querySelector('#encrypted-url').value;
        let key = document.querySelector('#key').value;
        if (key.value !== undefined || key.value !== '') {
            document.querySelector('#decrypted-url').value = decryptUrl(encryptedUrl, key).toString(cryptoJs.enc.Utf8);
        }
    }

    return(
        <div className="Decrypter flex flex-col h-fit rounded-lg dark:bg-gray-800 p-8">
            <p className="text-black dark:text-white font text-2xl lowercase font-logo tracking-wide">tool_: Decrypter <FontAwesomeIcon icon={faKey} /></p>
            <p className="py-4 text-gray-300">Use this section to decrypt your given link before accessing it to view it's contents.
            <br />Remember all encryption and decryption is done client-side.</p>
            <form className="Squrl__decrypted-url-form shadow-md rounded mb-4">
                <div className="">
                    <label className="block text-gray-300 text-sm font-bold mb-3" htmlFor="decrypted-url">
                        Encrypted URL
                    </label>
                    <input className="Decrypter__decrypted-url-form--encrypted shadow appearance-none border rounded w-full py-3 px-3 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="encrypted-url" type="url" placeholder="https://"/>
                    <p className="Decrypter__decrypted-url-form--error text-red-500 text-sm italic mt-2"></p>

                    <label className="block text-gray-300 text-sm font-bold mb-3" htmlFor="decrypted-url">
                        Session Key <i>(needed for decryption)</i>
                    </label>
                    <input className="Decrypter__decrypted-url-form--key shadow appearance-none border rounded w-full py-3 px-3 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="key" type="text" placeholder="e.g. 9f64a576"/>
                    <p className="Decrypter__decrypted-url-form--error text-red-500 text-sm italic mt-2"></p>

                    <div className="flex justify-evenly mt-6 mb-6 text-white">
                        <FontAwesomeIcon icon={faArrowDown}/>
                        <FontAwesomeIcon icon={faArrowDown}/>
                        <FontAwesomeIcon icon={faArrowDown}/>
                    </div>

                    <label className="block text-gray-300 text-sm font-bold mb-3" htmlFor="decrypted-url">
                        Decrypted URL Destination
                    </label>
                    <input className="Decrypter__decrypted-url-form--decrypted placeholder:text-gray-500 shadow appearance-none border rounded w-full py-3 px-3 
                    text-gray-50  dark:bg-gray-900 leading-tight focus:outline-none focus:shadow-outline" 
                    id="decrypted-url" type="url" readOnly="readOnly" placeholder="https://un.encrypted.url"/>
                    <p className="Decrypter__decrypted-url-form--error text-red-500 text-sm italic mt-2"></p>

                    <button className="bg-teal-600 hover:bg-teal-500 text-gray-50 font-semibold
                    py-2 px-4 mt-2 border border-teal-200 rounded shadow" onClick={(e) => launchDecrypter(e)}>Decrypt URL 🔓</button>
                </div>
            </form>
        </div>
    );
}
export default Decrypter;