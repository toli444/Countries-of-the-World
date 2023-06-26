function memoize<Input, Result>(originFn: (arg: Input) => Result) {
    let prevArg: Input;
    let cachedResult: Result;

    return (arg: Input) => {
        if (arg !== prevArg) {
            prevArg = arg;
            cachedResult = originFn(arg);
        }

        return cachedResult;
    };
}

export default memoize;
