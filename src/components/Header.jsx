const Header = () => {
    return (
        <div className="Header__wrapper flex flex-col mb-10 md:w-3/5 mt-10 md:mt-20">
            <div className="Header flex flex-row place-items-center">
                <img className="Header__squrl h-10 mr-4 hover:animate-spin" src="squrl.png" alt="squrl logo"/>
                <p className="Header__title text-white text-4xl font-logo">squrl</p>
            </div>
            <p className="Header__subtitle text-white font-medium text-md italic opacity-50 mt-2">The 100% E2EE URL Shortening Service!</p>
        </div>
    );
}

export default Header;