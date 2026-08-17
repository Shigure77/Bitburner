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
import { main as hackMath } from "./hack-math.js";

export function autocomplete(data, args) {
    return [...data.servers];  // This returns an array of server names, which are valid parameters for this script.
}

var d = "--------------";

export async function main(ns) {
    /* Main code */
    if (ns.args[0].length < 1) {  // Make sure a parameter was passed to the script.
        server = ns.getHostname();
        if (server == "home") {
            ns.tprint("ERROR: Cannot run on host server")
            ns.exit();
        }
    }

    if (ns.args[1].length < 1) {  // Make sure a parameter was passed to the script.
        server = ns.getHostname();
        if (server == "home") {
            ns.tprint("ERROR: Cannot run on host server")
            ns.exit();
        }
    }
    let server = ns.args[0];  // This gets the first parameter that was passed to the script.
    try {  // This tries to run the following code.
        ns.getServerSecurityLevel(server);  // Running this here lets us tests to see if the server name is valid.
    } catch (err) {  // The code goes here only if .getServerSecurityLevel() throws an error.
        ns.tprint(`ERROR: Invalid server name '${server}'.`);
        ns.exit();  // Ends the script.
    }

    const moneyThresh = ns.getServerMaxMoney(server);
    const securityThresh = ns.getServerMinSecurityLevel(server);

    const { hackthreads, growthreads, weakthreads } = await hackMath(ns,server);

    // Exec script functionsyntax
    //ns.exec("SCRIPT.js", "EXEC TARGET", THREADS, "ARG1");
    ns.print("--------------Nuking---------------");
    ns.exec("nuke.js", "home", 1, server);

    // Infinite loops that continously hacks/grows/weakens the target server the extra weakens maintain low security
    let threads = ns.args[1];  
    async function runAndWait(script, threads, ...args) {
        const pid = ns.exec(script, "home", threads, ...args);
        if (pid === 0) {
            ns.print(`${script} failed to execute`);
            await ns.sleep(1000);
            return;
        };
        while (ns.isRunning(pid)) {
          await ns.sleep(100);
        }
    }
    while (true) {
      ns.tprint(d + "HACKING" + d);
      await runAndWait("action/hack.js", hackthreads, server);
      ns.tprint(d + "WEAKENING" + d);
      await runAndWait("action/weaken.js", weakthreads, server);
      ns.tprint(d + "GROWING" + d);
      await runAndWait("action/grow.js", growthreads, server);
      ns.tprint(d + "WEAKENING" + d);
      await runAndWait("action/weaken.js", weakthreads, server);
    }
}
