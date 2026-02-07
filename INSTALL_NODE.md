# Installing Node.js on macOS

You need to install Node.js before you can run the development server. Here are the easiest methods:

## Method 1: Using Homebrew (Recommended)

If you have Homebrew installed:

```bash
# Install Node.js (includes npm)
brew install node

# Verify installation
node --version
npm --version
```

## Method 2: Using Homebrew (If not installed)

First install Homebrew, then Node.js:

```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Then install Node.js
brew install node

# Verify installation
node --version
npm --version
```

## Method 3: Direct Download (Easiest)

1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS version** (Long Term Support) - recommended
3. Run the installer (.pkg file)
4. Follow the installation wizard
5. Restart your terminal
6. Verify installation:
   ```bash
   node --version
   npm --version
   ```

## Method 4: Using nvm (Node Version Manager)

If you want to manage multiple Node.js versions:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or run:
source ~/.zshrc

# Install latest LTS Node.js
nvm install --lts

# Use it
nvm use --lts

# Verify
node --version
npm --version
```

## After Installation

Once Node.js is installed:

1. **Restart your terminal** (important!)
2. Navigate to your project:
   ```bash
   cd "/Users/shubham/Documents/Shubham Tandale/DSK Inerior"
   ```
3. Install project dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Verify Installation

After installing, verify with:

```bash
node --version   # Should show v18.x.x or higher
npm --version    # Should show 9.x.x or higher
```

## Troubleshooting

### "Command not found" after installation
- **Solution**: Restart your terminal or run `source ~/.zshrc`

### Permission errors
- **Solution**: Use `sudo` only if necessary, or fix npm permissions:
  ```bash
  mkdir ~/.npm-global
  npm config set prefix '~/.npm-global'
  echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
  source ~/.zshrc
  ```

### Port 3000 already in use
- **Solution**: Kill the process using port 3000:
  ```bash
  lsof -ti:3000 | xargs kill -9
  ```

## Recommended Version

- **Node.js**: v18.x.x or v20.x.x (LTS)
- **npm**: Comes with Node.js (v9.x.x or higher)

---

**Quick Start (Recommended):**
1. Download from [nodejs.org](https://nodejs.org/) - LTS version
2. Install the .pkg file
3. Restart terminal
4. Run `npm install` in project directory
5. Run `npm run dev`






