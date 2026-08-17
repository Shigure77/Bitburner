/** @param {NS} ns */
export async function main(ns) {
    let server = ns.args[0];
    const moneyThresh = ns.getServerMaxMoney(server);
    while (ns.getServerMoneyAvailable(server) < moneyThresh) {
        // If the server's money is less than our threshold, grow it
        try {
            await ns.grow(server);
        } catch (err) {
            ns.tprint(`ERROR: Failed to grow server "${server}".`);
            ns.exit();
        }
    }
}
