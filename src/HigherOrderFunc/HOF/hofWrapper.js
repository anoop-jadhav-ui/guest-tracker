const hofWrapper = (WrappedComp, attributes) => {
    return () => {
        return <WrappedComp data-attr={attributes}></WrappedComp>
    }
}

export default hofWrapper;