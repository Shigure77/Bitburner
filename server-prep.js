/** @param {NS} ns */
const d = "--------------";
export async function main(ns)  {

    try {
        ns.print(d + "WEAKENING" + d);
        await runAndWait(script.weaken, weakthreads, server);
    } catch (err) {
        ns.tprint(`ERROR: Failed to start weaken.js`);
        ns.exit();
    }
    try {
        ns.print(d + "GROWING" + d);
        await runAndWait(script.grow, growthreads, server);
    } catch (err) {
        ns.tprint(`ERROR: Failed to start grow.js`);            
        ns.exit();
    }


}