
export const getModule = module => module.default
export const getRoute = (store, module) => getModule(module)(store)

