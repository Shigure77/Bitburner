/** @param {NS} ns */
export async function main(ns) {

    const exe = ["ssh", "sql", "ftp", "smtp", "http"];
    const exelist = {ssh:"BruteSSH.exe", sql:"SQLInject.exe", ftp:"FTPCrack.exe", smtp:"relaySMTP.exe", http:"HTTPWorm.exe"};
    const portopen = {ssh:"sshPortOpen", sql:"sqlPortOpen", ftp:"ftpPortOpen", smtp:"smtpPortOpen", http:"httpPortOpen"};
    const portfunction = {ssh:ns.brutessh, sql:ns.sqlinject, ftp:ns.ftpcrack, smtp:ns.relaysmtp, http:ns.httpworm};

    var d = "--------------";

    let server = ns.args[0];  // This gets the first parameter that was passed to the script.
    ns.print(d + "CHECKING PORTS" + d);
    const s = ns.getServer(server);
    const closed = [];
    
    ns.print(d + "CHECKING PORTS" + d);

    // check closed ports and add to array
    for (const key of Object.keys(portopen)) {
        if (s[portopen[key]] === false) {
            closed.push(key);
        }
    }

    //open ports if any are closed
    ns.print(d + "OPENING PORTS" + d);
    if (closed.length > 0) {
        continue;
    } else {
        for (const key of closed) {
            if (ns.fileExists(exelist[key], "home")) {
                ns.print(d + key.toUpperCase() + d);
                portfunction[key](server);
                ns.print(d + "PORT OPENED" + d);
            } else {
                ns.print("===> PORT OPEN SKIPPING" + portopen[key] + ".......");
            }
        }
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