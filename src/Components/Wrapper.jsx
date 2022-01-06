const Wrapper = (props) => {
    return (
        <div className="Wrapper rounded-lg w-auto min-w-5/6 p-8 bg-gray-300 dark:bg-gray-700 drop-shadow-xl">
            {props.children}
        </div>
    );
}

export default Wrapper;