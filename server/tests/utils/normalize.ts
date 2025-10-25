

export const stripRuntimeFields = (arr: any[]) =>
    arr.map(({id, _id, __v, ...rest}) => ({
        ...rest,
        launchDate: new Date(rest.launchDate).toISOString().slice(0, 10),
    }));