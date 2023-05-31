import * as si from 'systeminformation';
import * as readline from 'readline';

const getGB = (bytes: number): string => {
  return (bytes / (1024 ** 3)).toFixed(2) + ' GB';
}

const getInfo = async (): Promise<string> => {
  const [graphicsInfo, temperature, memory, battery, os, user, cpu] = await Promise.all([
    si.graphics(),
    si.cpuTemperature(),
    si.mem(),
    si.battery(),
    si.osInfo(),
    si.users(),
    si.cpu()
  ]);

  return `Operating system: ${os.platform},
Architecture: ${os.arch},
Current user name: ${user[0].user},
CPU cores models: ${cpu.model},
CPU Temperature: ${temperature.main},
Graphic controllers vendor: ${graphicsInfo.controllers[0].vendor},
Graphic controllers model: ${graphicsInfo.controllers[0].model},
Total memory: ${getGB(memory.total)},
Used memory: ${getGB(memory.used)},
Free memory: ${getGB(memory.free)},
Battery charging: ${battery.isCharging},
Battery percent: ${battery.percent},
Battery remaining time: ${battery.timeRemaining}`;
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const handleInfo = () => {
  getInfo().then(data => {
    console.log(data + '\n');
  });
};

rl.question('Enter time in ms: ', (time: string) => {
  setInterval(handleInfo, +time)
  rl.close();
});
