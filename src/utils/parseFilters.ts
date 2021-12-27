/*
   eq: equals
   gt: greater than
   gte: greater than or equals
   lt: less than
   lte: less than or equals,
   ne: not equals
 */

export const parseFilters = (input: string) => {
    let returnObject = {} as Record<string, any>;
    let filter = JSON.parse(input);
    const filterTypes = ['eq', 'gt', 'gte', 'lt', 'lte', 'ne'];

    // loop through all filters
    for (const i of Object.keys(filter)) {
        if (typeof filter[i] !== 'object') {
            returnObject[i] = filter[i];
            continue;
        }
        // check if filter type is valid
        if (!filterTypes.includes(filter[i].type)) {
            returnObject.filterError = {
                status: 0,
                error: `Filter type ${filter[i].type} for ${i} is invalid`
            }
            return returnObject
        }

        // add filter to return object
        returnObject[i] = {
            [`$${filter[i].type}`]: filter[i].value
        }
    }
    return returnObject
}