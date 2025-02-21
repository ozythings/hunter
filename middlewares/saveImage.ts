import looksSame from "looks-same";
import fs from "fs";
import { writeFile, readdir } from "fs/promises";

const saveImage = async (data, message, user, date) => {
  const f = date();
  
  const d = f.split(' ')[0].split('.');
  const t = f.split(' ')[1].split(':');

  const path = `dist/${user}/images`;
  fs.mkdirSync(path, { recursive: true });

  // fetch image
  message('Downloading image...');
  const response = await fetch(data.imgUrl);
  const buffer = Buffer.from(await response.arrayBuffer());
  const newImagePath = `${path}/${d[1]}_${d[0]}_${d[2]}_${t[0]}_${t[1]}.png`;

  // get last two saved images
  const files = await readdir(path);
  const images = files.filter(file => file.endsWith('.png')).sort((a, b) => 
    fs.statSync(`${path}/${b}`).mtimeMs - fs.statSync(`${path}/${a}`).mtimeMs
  );

  if (images.length > 0) {
    const lastImage = `${path}/${images[0]}`;
    //const newImage = `${path}/${images[1]}`;
    
    // comparing the new image with the last image
    const { equal } = await looksSame(buffer, lastImage);
    
    if (equal) {
      message('New image is identical to the last one. Skipping save.');
      console.log("New image is identical to the last one. Skipping save.");
      return;
    }
  }

  // save new image
  await writeFile(newImagePath, buffer);
  message(`New image saved: ${newImagePath}`);
  console.log(`Download complete: ${newImagePath}`);
}

export default saveImage;

