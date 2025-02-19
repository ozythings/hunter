import {config} from 'dotenv';
import fs from 'fs';

config();

const user = process.env.USER;

// const users = fs.readdirSync('dist');
const folders = fs.readdirSync(`dist/${user}`);

folders.forEach(async folder => {
    if (folder.includes('.')) return;

    let all = [];
    const match_date = folder.match(/(\d{2})(\d{2})(\d{4})/);
    const date = `${match_date[1]}.${match_date[2]}.${match_date[3]}`;
    const subfolders = fs.readdirSync(`dist/${user}/${folder}`);

    await subfolders.forEach(folder_ => {
        const match_time = folder_.match(/(\d{2})/);
        const time = match_time[1];
        const path = `dist/${user}/${folder}/${folder_}`;

        fs.readdirSync(path)
            .forEach(file => {
                const content = fs.readFileSync(`${path}/${file}`, 'utf-8');
                const data = JSON.parse(content);

                if (folders.includes(`${date.replaceAll('.', '')}.json`)) {
                    all = JSON.parse(fs.readFileSync(`dist/${user}/${folder}.json`, 'utf-8'));

                    if (all.find(e => e.time === time + ':' + file.split('_')[0])) return;

                    return all.push({
                        date,
                        time: time + ':' + file.split('_')[0],
                        [file.split('_')[1].replace('.json', '')]: data,
                    });
                }

                all.push({
                    date,
                    time: time + ':' + file.split('_')[0],
                    [file.split('_')[1].replace('.json', '')]: data,
                });
            });
    });

    const content = JSON.stringify(all, null, 4);
    const path = `dist/${user}/${folder}.json`;

    fs.writeFileSync(path, content);
});

