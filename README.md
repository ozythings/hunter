# Hunter

A Node.js application that helps you analyze your Instagram followers and following lists. This tool automatically scrapes and saves your Instagram follower data for tracking changes over time.

## Features

- 🔍 Scrapes followers and following lists from Instagram
- 📊 Saves data in JSON format for easy analysis
- 📅 Organizes data by date and time
- 🤖 Uses Puppeteer with stealth plugin to avoid detection
- ⏱️ Automatic scrolling to capture complete lists
- 🔒 Session-based authentication

## Prerequisites

- Node.js (v14 or higher)
- Google Chrome browser
- Instagram account

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yuswf/hunter.git
cd hunter
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
SESSION=your_instagram_session_id
URL=https://www.instagram.com/
USER=target_username
```

## Configuration

Update the Chrome executable path in `middlewares/script.js` if needed:
```javascript
executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
```

## Usage

Run the application:
```bash
node index.js
```

The application will:
1. Launch a headless Chrome browser
2. Navigate to the specified Instagram profile
3. Scrape followers and following lists
4. Save the data in JSON format under the `dist` directory

### Output Structure

Data is saved in the following structure:
```
dist/
└── [username]/
    └── [MMDDYYYY]/
        └── [HH]/
            ├── [MM]_followers.json
            └── [MM]_following.json
```

### Adjusting Scroll Timeout

If you have a slower internet connection, you may need to increase the scroll timeout in `utils/scroll.js`:

```javascript
// Default timeout is 2000ms (2 seconds)
await new Promise(resolve => setTimeout(resolve, 2000));

// For slower connections, try increasing to 3000ms or higher
await new Promise(resolve => setTimeout(resolve, 3000)); // or even 5000
```

A higher timeout value gives Instagram more time to load followers/following data between scrolls.

### If you want to run the script in the background, you can use Task Scheduler on Windows:

#### You should create a bat file to run the script:

```bat
@echo off
cd /d C:\path\to\your\project && node index.js
```

#### Then, you should create a task in Task Scheduler:
`Search App > Task Scheduler > Create Basic Task > Next > Browse > C:\path\to\your\bat\file.bat > Next > Next > Set the trigger > Set the actions > Set the conditions > Create > Ok`

## Dependencies

- puppeteer-extra
- puppeteer-extra-plugin-stealth
- dotenv

## License

This project is licensed under the MIT License - see the LICENSE file for details.
