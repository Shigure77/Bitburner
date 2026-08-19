/**
 * @typedef {(string | number | boolean)} ArgTypes
 **/
/**
 * autocomplete: Automatically completes parameters that match strings in the returned array
 *                  when this script is called in a "run" command at the command line.
 *
 * @param   {AutocompleteData}  data
 * @param   {ArgTypes[]}        args
 * @returns {string[]}
 **/
export function autocomplete(data, args) {
    return [...data.servers];  // This returns an array of server names, which are valid parameters for this script.
}