/** @param {NS} ns */
export async function main(ns) {
    var d = "--------------";
    let server = ns.args[0];
    const securityThresh = ns.getServerMinSecurityLevel(server);
    ns.print(d + "WEAKENING" + d);
    while (ns.getServerSecurityLevel(server) > securityThresh) {
        // If the server's security level is above our threshold, weaken it
        try {
            await ns.weaken(server);
        } catch (err) {
            ns.tprint(`ERROR: Failed to weaken server '${server}'.`);
            ns.exit();
        }
    }
}
