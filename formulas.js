/** @param {NS} ns */
export async function main(ns)  {
    const d = "--------------";
    let server = ns.args[0];

    hacktime= ns.getHackTime(server);
    growtime= ns.getGrowTime(server);
    weaktime= ns.getWeakenTime(server);


}