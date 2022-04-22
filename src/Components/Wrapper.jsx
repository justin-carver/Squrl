const Wrapper = (props) => {
    return (
        <div className="Wrapper grid 2xl:grid-cols-2 xl:grid-cols-1 gap-6 w-3/5 mt-1/2 z-5 drop-shadow-xl">
            {props.children}
        </div>
    );
}

export default Wrapper;