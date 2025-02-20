import fs from 'fs';
import saveImage from './saveImage';

const write = (data, message, user, date) => {
  const f = date();
  const d = f.split(' ')[0].split('.');
  const t = f.split(' ')[1].split(':');

  message('Creating folders...');
  fs.mkdirSync(`dist/${user}/${d[1]}_${d[0]}_${d[2]}/${t[0]}`, { recursive: true });

  message('Writing followers data to file...');
  fs.writeFileSync(`dist/${user}/${d[1]}_${d[0]}_${d[2]}/${t[0]}/${t[1]}_followers.json`, JSON.stringify(data.followers, null, 4));

  message('Writing following data to file...');
  fs.writeFileSync(`dist/${user}/${d[1]}_${d[0]}_${d[2]}/${t[0]}/${t[1]}_following.json`, JSON.stringify(data.following, null, 4));
}

export default write;
