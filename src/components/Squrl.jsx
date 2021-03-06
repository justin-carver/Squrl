import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { parseUrl } from '../dbinteract';
import SessionKeyField from './SessionKeyField';

const Squrl = () => {
    const [globalSessionKey, setGlobalSessionKey] = useState('');

    return (
        <div className="Squrl flex flex-col  rounded-lg dark:bg-gray-700 p-10">
            <p className="text-black dark:text-white font text-3xl lowercase font-logo tracking-wide">
                Encrypter <FontAwesomeIcon icon={faKey} />
            </p>
            <p className="Squrl__about py-4 text-gray-300">
                Squrl,{' '}
                <a
                    href="https://github.com/justin-carver/squrl"
                    className="text-gray-400 underline underline-offset-4"
                >
                    Secure Quick URL
                </a>
                , is a modern URL shortener with end-to-end encryption for a more secure transfer of
                information. Click{' '}
                <a
                    href="https://github.com/justin-carver/squrl#end-to-end-encryption-"
                    className="text-gray-400 underline underline-offset-4"
                >
                    here
                </a>{' '}
                to see how Squrl's encryption works!
                <br />
                <br />
                <i className="block text-center">
                    The generated session key is renewed on every page refresh. <br />
                    Do not forget to write this key down if you intend to share this link!
                </i>
            </p>
            <form className="Squrl__url-form bg-white dark:bg-gray-600 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <SessionKeyField onGenerateKey={setGlobalSessionKey} />
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="url">
                        URL for Encryption
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-3 px-3 
                    text-gray-700 placeholder-slate-300 leading-tight focus:outline-none focus:shadow-outline mb-8"
                        id="url"
                        type="url"
                        placeholder="https://mysecretwebsite.com/private"
                    />
                    <p
                        className="Squrl__url-form--error text-red-500 text-sm italic mt-2"
                        id="squrl-error"
                    ></p>
                </div>
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="output">
                    Shortened URL
                </label>
                <input
                    className="Squrl__output cursor-default placeholder:text-gray-500 bg-gray-400 dark:bg-gray-800 shadow appearance-none border rounded w-full py-3 px-3 
                    text-gray-100 leading-tight"
                    id="output"
                    type="url"
                    placeholder="https://squrl.dev/Xf43D+Qd4x3_"
                    readOnly="readOnly"
                />
                <p className="text-gray-300 text-sm italic mt-2">
                    Remove the <b>Session Key</b> from the link <b>(token after the +)</b> to prompt
                    users for a password.
                </p>
            </form>
            <button
                className="bg-teal-300 hover:bg-teal-500 text-gray-900 font-semibold
            py-2 px-4 border border-teal-200 rounded shadow"
                onClick={() => parseUrl(globalSessionKey)}
            >
                {' '}
                Encrypt & Shorten URL ????
            </button>
        </div>
    );
};

export default Squrl;
