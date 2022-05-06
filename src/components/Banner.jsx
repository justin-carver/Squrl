// TODO: Fix issue with banner breaking width when on mobile.
import { useEffect, useState} from "react";

const Banner = () => {

    const [bannerVisibility, setBannerVisibility] = useState(localStorage.getItem('banner-visibility')||"" );

    const hideBanner = () => {
        document.querySelector('.Banner').classList.add('hidden');
        setBannerVisibility('hidden');
    }

    useEffect(() => {
        localStorage.setItem("banner-visibility", bannerVisibility);
    }, [bannerVisibility]);

    return (
    <div className={"Banner bg-indigo-700 absolute top-0 w-full z-10" + bannerVisibility}>
        <div className="max-w-2xl mx-auto py-2 px-3 sm:px-6 lg:px-8">
            <div className="flex items-center flex-wrap">
                <div className="w-0 flex-1 flex items-center">
                <p className="font-medium text-white truncate">
                    <span className="ml-6 hidden md:inline">This project is open-source! 💻💾🤝 Check it out on GitHub!</span>
                </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <a href="https://github.com/justin-carver/squrl" className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium 
                text-indigo-600 bg-white hover:bg-indigo-400 hover:text-white"> GitHub </a>
            </div>
            <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                <button class="hover:bg-indigo-400 text-gray-800 font-bold py-2 px-2 rounded inline-flex items-center" onClick={hideBanner}>
                    <span className="sr-only">Dismiss</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="white">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            </div>
        </div>
    </div>
    );
}

export default Banner;
