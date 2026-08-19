/** @param {NS} ns */
export async function main(ns)  {
    const d = "--------------";
    let server = ns.args[0];

    hacktime= ns.getHackTime(server);
    growtime= ns.getGrowTime(server);
    weaktime= ns.getWeakenTime(server);

    ns.tprint(hacktime);
    ns.tprint(growtime);
    ns.tprint(weaktime);

    ns.tprint(Date.now());
    ns.tprint(performance.now());
    ns.tprint(ns.getTimeSinceLastAug());

}