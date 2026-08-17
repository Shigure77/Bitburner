/** @param {NS} ns */
export async function main(ns) {
    var d = "--------------";

    let server = ns.args[0];  // This gets the first parameter that was passed to the script.
    ns.print(d + "CHECKING PORTS" + d);
    const s = await ns.getServer(server);


    ns.print(d + "OPENING PORTS" + d);
    if (ns.fileExists("BruteSSH.exe", "home") && s.sshPortOpen == false) {
        ns.print(d + "BRUTESSH" + d);
        ns.brutessh(server);
    } else if (s.sshPortOpen == true) {
        ns.print("==>ssh open continuing...");
    }
    if (ns.fileExists("SQLInject.exe", "home") && s.sqlPortOpen == false) {
        ns.print(d + "SQLINJECT" + d);
        ns.sqlinject(server);
    } else if (s.sqlPortOpen == true) {
        ns.print("==>sql open continuing...");
    }
    if (ns.fileExists("FTPCrack.exe", "home") && s.ftpPortOpen == false) {
        ns.print(d + "FTPCRACK" + d);
        ns.ftpcrack(server);
    } else if (s.ftpPortOpen == true) {
        ns.print("==>ftp open continuing...");
    }
    if (ns.fileExists("relaySMTP.exe", "home") && s.smtpPortOpen == false) {
        ns.print(d + "RELAYSMTP" + d);
        ns.relaysmtp(server);
    } else if (s.smtpPortOpen == true) {
        ns.print("==>smtp open continuing...");
    }
    if (ns.fileExists("HTTPWorm.exe", "home") && s.httpPortOpen == false) {
        ns.print(d + "HTTPWORM" + d);
        ns.httpworm(server);
    } else if (s.httpPortOpen == true) {
        ns.print("==>http open continuing...");
    }

    if (s.hasAdminRights == false) {
        try {
            ns.nuke(server);
        } catch (err) {
            ns.tprint(`ERROR: Failed to nuke server '${server}'.`);
            ns.exit();
        }
    }
}