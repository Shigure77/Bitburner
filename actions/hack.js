/** @param {NS} ns */
export async function main(ns)  {
    let server = ns.args[0];
    if (ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()) {
        try {
            await ns.hack(server);
        } catch (err) {
            ns.tprint(`ERROR: Failed to hack server "${server}".`);
            ns.exit();
        }
    }
}
