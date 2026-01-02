import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

async function install() {
    console.log("📦 Installing astron-browser...");
    try {
        const { stdout, stderr } = await execAsync("npm i -g astron-browser");
        if (stderr) console.log(`Info: ${stderr.trim()}`);
        if (stdout) console.log(`Output: ${stdout.trim()}`);
        console.log("✅ Installed successfully!");
    } catch (error) {
        console.error(`❌ Install failed: ${error.message}`);
    }
}

async function uninstall() {
    console.log("🗑️ Uninstalling astron-browser...");
    try {
        const { stdout, stderr } = await execAsync("npm uninstall -g astron-browser");
        if (stderr) console.log(`Info: ${stderr.trim()}`);
        if (stdout) console.log(`Output: ${stdout.trim()}`);
        console.log("✅ Uninstalled successfully!");
    } catch (error) {
        console.error(`❌ Uninstall failed: ${error.message}`);
    }
}

async function main() {
    let cycle = 1;

    while (true) {
        console.log(`\n🔄 --- Cycle ${cycle} ---`);

        await install();
        console.log("⏳ Waiting 20 seconds...");
        await sleep(5);

        await uninstall();
        console.log("⏳ Waiting 20 seconds...");
        await sleep(5);

        cycle++;
    }
}

main();