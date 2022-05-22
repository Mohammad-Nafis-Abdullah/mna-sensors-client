const trimError = (error='')=> {
    const errorMssg = error?.code?.slice(5)?.split('-')?.join(' ')?.toUpperCase();
    return errorMssg;
}

export default trimError;