/**
 * @typedef {(string | number | boolean)} ArgTypes
 **/
/**Auto complete function for server names
 * @param   {AutocompleteData}  data
 * @param   {ArgTypes[]}        args
 * @returns {string[]}
 **/
export function autocomplete(data, args) {
    return [...data.servers];  // This returns an array of server names, which are valid parameters for this script.
}


import { main as hackMath } from "./hack-math.js";
import { main as serverPrep } from "./server-prep.js";

const type = ["hack", "weaken1", "grow", "weaken2"];
const script = {hack:"actions/hack.js", weaken1:"actions/weaken.js", grow:"actions/grow.js", weaken2:"actions/weaken.js"};
const { hackthreads, growthreads, weakthreads } = await hackMath(ns,server);
const threadtype = {hack:hackthreads, weaken1:weakthreads, grow:growthreads, weaken2:weakthreads};
const nuke = "actions/nuke.js";

var d = "--------------";



export async function main(ns) {
    /* Main code */
    const server = ns.args[0];  // This gets the first parameter that was passed to the script.
    if (ns.args[0].length < 1) {  // Make sure a parameter was passed to the script.
        ns.tprint("ERROR: No server name provided");
        ns.exit();
    }
    if (server === "home") {
        ns.tprint("ERROR: Cannot run on host server")
        ns.exit();
    }

    try {  // This tries to run the following code.
        ns.getServerSecurityLevel(server);  // Running this here lets us tests to see if the server name is valid.
    } catch (err) {  // The code goes here only if .getServerSecurityLevel() throws an error.
        ns.tprint(`ERROR: Invalid server name '${server}'.`);
        ns.exit();  // Ends the script.
    }

    const moneyThresh = ns.getServerMaxMoney(server);
    const securityThresh = ns.getServerMinSecurityLevel(server);


    // Exec script functionsyntax
    //ns.exec("SCRIPT.js", "EXEC TARGET", THREADS, "ARG1");
    if (!ns.hasRootAccess(server)) {
        ns.print(d + "NUKING" + d);
        try {
            await runAndWait(nuke, 1, server);
        } catch (err) {
            ns.tprint(`ERROR: Failed to start nuke.js`);
            ns.exit();
        }
    }
    // math stage using Formulas.exe
    if (ns.fileExists("Formulas.exe", "home")) {

    }
    
    // server prep stage
    while (ns.getServerMoneyAvailable(server) < moneyThresh || ns.getServerSecurityLevel(server) > securityThresh) {
        for (let t of type) {
            if (t === "hack" || t === "weaken2") continue;
            try {
                ns.print(d + t + d);
                await runAndWait(script[t], threadtype[t], server);
            } catch (err) {
                ns.tprint(`ERROR: Failed to start` + t + ".js");
                ns.exit();
            }
        }
    }

    // Function to run a script and wait for it to complete
    let threads = ns.args[1];  
    async function runAndWait(script, threads, ...args) {
        const pid = ns.exec(script, "home", threads, ...args);
        ns.print(d + "RUNNING" + d);
        let startTime = Date.now();
        if (pid === 0) {
            ns.print(`${script} failed to execute`);
            await ns.sleep(1000);
            return;
        };
        while (ns.isRunning(pid)) {
          await ns.sleep(100);
        }
        let timeElapsed = Date.now() - startTime;
        ns.print("----- DONE --- TIME ELAPSED: " + timeElapsed + "ms -----");
    }

    // Infinite loops that continously hacks/grows/weakens the target server the extra weakens maintain low security
    while (true) {
        ns.print(d + "CALCULATING THREADS" + d);
        const { hackthreads, growthreads, weakthreads } = await hackMath(ns,server);
        for (let t of type) {
            try {
                ns.print(d + t + d);
                await runAndWait(script[t], threadtype[t], server);
            } catch (err) {
                ns.tprint(`ERROR: Failed to start` + t + ".js");
                ns.exit();
            }

        }
    }
}