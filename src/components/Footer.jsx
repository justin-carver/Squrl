const Footer = (props) => {
    return (
        <div className="Footer flex flex-col items-center text-center justify-center content-center mt-8 mb-24">
            <div className="Footer__notice italic text-white/40 mt-6 sm:w-7/12 mb-6">
                <p className=""><b className="underline">DISCLAIMER:</b> By encrypting or decrypting any links, or utilizing this service in any way, you are agreeing to the Terms of Service and Privacy Policy below; https://squrl.dev and maintainers are <b>not</b> responsible for any potential damage caused by unknown redirects. If you are unsure
                    about where a certain link leads, <b>please</b> proceed with caution or do not utilize this service.
                </p>
            </div>
            <div className="Footer__tos text-white cursor-help" href="./" alt="Privacy Policy Link"><b className="text-red-500" onClick={() => props.termsToggle(true)}>Terms of Service</b> <br/><span className="text-slate-500">(Please <b>read</b> before generating <b>any</b> links)</span></div>
        </div>
    );
}

export default Footer;