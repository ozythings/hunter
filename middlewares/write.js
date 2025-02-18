import fs from 'fs';

const write = async (data, message) => {

    message('Writing followers data to file...');
    await fs.writeFileSync('dist/followers.json', JSON.stringify(data.followers, null, 4));

    message('Writing following data to file...');
    await fs.writeFileSync('dist/following.json', JSON.stringify(data.following, null, 4));
}

export default write;
