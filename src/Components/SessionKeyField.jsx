import { useState, useEffect } from "react";
import { generateSessionKey } from '../dbinteract';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const SessionKeyField = (props) => {

    const [sessionKey, setSessionKey] = useState('defaultSessionKey');

    useEffect(() => {
        let tempKey = generateSessionKey();
        props.onGenerateKey(tempKey);
        setSessionKey(tempKey);
    }, []);

    return(
        <div className="mb-2">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="url">
                Generated Session Key ( <i className="text-slate-300">Share to make link public!</i> <FontAwesomeIcon icon={faLink} /> )
            </label>
            <input className="shadow appearance-none border rounded w-full py-3 px-3 
            text-gray-700 bg-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            id="session-key" type="text" placeholder="" readOnly="readOnly" value={sessionKey}/>
        </div>
    );
}

export default SessionKeyField;