/** @param {NS} ns */
export async function main(ns) {
    let server = ns.args[0];
  
    ns.tprint("Server max money: " + ns.getServerMaxMoney(server));
  
    //math functions needed as functions cannot handle decimals under 1
    function getServerMath() {
      return function calc() { return ns.getServerMaxMoney(server) * 0.01 };
    }
    const serverMath = getServerMath();

    // Calculate the thread count of a single hack that would take $100k from n00dles
    //const hackThreads = ns.hackAnalyzeThreads("n00dles", 1e5);
    let hackthreads = Math.ceil(ns.hackAnalyzeThreads(server, serverMath()));
    ns.tprint("Hack threads: " + hackthreads);
    let hackedmoney = (ns.getServerMaxMoney(server)) - ((ns.hackAnalyze(server)) * hackthreads)
    ns.tprint("Hacked money: " + hackedmoney);
    let growthreads = Math.ceil(ns.growthAnalyze(server, 1/(1 - ns.hackAnalyze(server))))
    ns.tprint("Growth reads: " + growthreads);
    let weakthreads = Math.ceil(ns.hackAnalyzeSecurity(hackthreads, server) / ns.weakenAnalyze(1))
    ns.tprint("Weak threads: " + weakthreads);

    return { hackthreads, hackedmoney, growthreads, weakthreads };
}
  
 