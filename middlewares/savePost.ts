import looksSame from "looks-same";
import fs from "fs";
import { writeFile, readdir } from "fs/promises";

const savePost = async (data, message, user, date) => {
  const f = date();

  const d = f.split(' ')[0].split('.');
  const t = f.split(' ')[1].split(':');

  const path = `dist/${user}/posts`;
  fs.mkdirSync(path, { recursive: true });

  message('Downloading posts...');
  if (data.postUrls.length === 0) {
    message("No post was found.");
    return;
  }

  // fetch posts
  for (let i = 0; i < data.postUrls.length; i++) {
    const postUrl = data.postUrls[i];

    const response = await fetch(postUrl);
    const buffer = Buffer.from(await response.arrayBuffer());
    const newPostPath = `${path}/${i + 1}-${d[1]}_${d[0]}_${d[2]}_${t[0]}_${t[1]}.png`;

    const files = await readdir(path);
    const images = files.filter(file => file.endsWith('.png'));

    if (images.length > 0) {
      let isIdentical = false;

      for (let i = 0; i < images.length; i++) {
        const image = images[i];

        const { equal } = await looksSame(buffer, `${path}/${image}`);
        if (equal) {
          message('New image is identical to the last one. Skipping save.');
          console.log("New image is identical to the last one. Skipping save.");
          isIdentical = true;
          break;
        }
      }

      // if there is no identical image, save the new one
      if (!isIdentical) {
        await writeFile(newPostPath, buffer);
        message(`New image saved: ${newPostPath}`);
        console.log(`Download complete: ${newPostPath}`);
      }
    } else {
      // if there are no images save them right away
      await writeFile(newPostPath, buffer);
      message(`New image saved: ${newPostPath}`);
      console.log(`Download complete: ${newPostPath}`);
    }
  }
};

export default savePost;
