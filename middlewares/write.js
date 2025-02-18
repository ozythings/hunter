import fs from 'fs';

const write = async (data, message, user, date) => {
    const f = date();
    const d = f.split(' ')[0].split('.');
    const t = f.split(' ')[1].split(':');

    message('Creating folders...');
    await fs.mkdirSync(`dist/${user}/${d[1] + d[0] + d[2]}/${t[0]}`, {recursive: true});

    message('Writing followers data to file...');
    await fs.writeFileSync(`dist/${user}/${d[1] + d[0] + d[2]}/${t[0]}/${t[1]}_followers.json`, JSON.stringify(data.followers, null, 4));

    message('Writing following data to file...');
    await fs.writeFileSync(`dist/${user}/${d[1] + d[0] + d[2]}/${t[0]}/${t[1]}_following.json`, JSON.stringify(data.following, null, 4));
}

export default write;
