const Wrapper = (props) => {
    return (
        <div className="Wrapper grid 2xl:grid-cols-2 xl:grid-cols-1 gap-6 md:w-3/5 sm:w-full z-5 drop-shadow-xl">
            {props.children}
        </div>
    );
}

export default Wrapper;