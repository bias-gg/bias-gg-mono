# install homebrew if not already installed

if ! command -v brew &> /dev/null
then
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# install node
brew install node

# install bun
brew install oven-sh/bun/bun

# install yarn
brew install yarn

# install ripgrep
brew install ripgrep
