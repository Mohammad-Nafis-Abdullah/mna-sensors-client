const trimError = (error='')=> {
    const errorMssg = error?.code?.split('/')[1]?.split('-')?.join(' ')?.toUpperCase();
    return errorMssg;
}

export default trimError;