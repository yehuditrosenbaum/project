export const  actions = new Proxy(
    {},
    {
        get: function name(target, prop) {
            if (target[prop] === undefined) {
                return function name(args) {
                    return {
                        type: prop,
                        payload: args
                    };
                };
            }
            else {
                return target[prop];
            }
        }
    }
)