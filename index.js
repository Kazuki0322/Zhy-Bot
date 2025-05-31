import { createBot } from 'mineflayer';
import { pathfinder, Movements, goals } from 'mineflayer-pathfinder';
import { Vec3 } from 'vec3';
import mcDataLoader from 'minecraft-data';

const bot = createBot({
  host: 'KingdomOfYggdrasil.aternos.me',
  port: 52364,
  username: 'AFK_Bot123', // change if needed
  auth: 'offline'
});

bot.loadPlugin(pathfinder);

bot.once('spawn', () => {
  const mcData = mcDataLoader(bot.version);
  const defaultMove = new Movements(bot, mcData);
  bot.pathfinder.setMovements(defaultMove);

  console.log('Bot spawned and ready.');

  let angle = 0;
  const center = bot.entity.position.clone();

  function moveInCircle() {
    angle += Math.PI / 4; // 45 degrees step
    const radius = 3;
    const x = center.x + radius * Math.cos(angle);
    const z = center.z + radius * Math.sin(angle);
    const target = new Vec3(x, center.y, z);

    bot.lookAt(target.offset(0, 1.6, 0), true);
    bot.pathfinder.setGoal(new goals.GoalBlock(target.x, target.y, target.z));
  }

  // Move every 5 minutes (300,000 ms)
  moveInCircle(); // First move
  setInterval(moveInCircle, 300000);
});
