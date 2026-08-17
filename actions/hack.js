/** @param {NS} ns */
export async function main(ns)  {
    var d = "--------------";
    let server = ns.args[0];
    ns.print(d + "HACKING" + d);
    if (ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()) {
        try {
            await ns.hack(server);
        } catch (err) {
            ns.tprint(`ERROR: Failed to hack server "${server}".`);
            ns.exit();
        }
    }
}
