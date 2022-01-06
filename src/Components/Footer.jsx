const Footer = () => {
    return (
        <div className="Footer flex flex-col h-1 align-middle text-center">
            <a className="Footer__privacy text-white" href="./" alt="Privacy Policy Link">Privacy Policy</a>
            <a className="Footer__tos text-white" href="./" alt="Privacy Policy Link"><b className="text-red-500">Terms of Service</b> <br/><span className="text-slate-500">(Please <b>read</b> before generating <b>any</b> links)</span></a>
        </div>
    );
}

export default Footer;