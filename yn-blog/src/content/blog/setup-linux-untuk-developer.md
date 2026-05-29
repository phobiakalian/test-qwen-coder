---
title: "Setup Linux untuk Developer Pemula"
description: "Panduan lengkap setup environment Linux untuk developer pemula, mencakup distro pilihan, tools essential, dan konfigurasi yang wajib dilakukan."
date: 2025-03-10
tags: ["linux", "tutorial"]
author: "YN"
draft: false
---

## Pendahuluan

Linux adalah sistem operasi favorit para developer. Fleksibel, powerful, dan open source. Artikel ini akan memandu Anda dalam setup Linux untuk development.

## 1. Memilih Distro

Untuk pemula, saya rekomendasikan:

- **Ubuntu** - Paling populer, dokumentasi melimpah
- **Fedora** - Update rutin, teknologi terbaru
- **Pop!_OS** - Ubuntu-based, optimized untuk productivity
- **Linux Mint** - Mirip Windows, mudah untuk transition

## 2. Install Essential Tools

Setelah install distro, jalankan command berikut:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install build essentials
sudo apt install build-essential git curl wget -y

# Install Python & pip
sudo apt install python3 python3-pip -y

# Install Node.js (via nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

## 3. Setup Terminal

Terminal default bagus, tapi bisa ditingkatkan:

### Install Zsh + Oh My Zsh

```bash
# Install zsh
sudo apt install zsh -y

# Install Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Install plugin tambahan
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

Edit `~/.zshrc`:

```bash
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

## 4. Code Editor

### VS Code Setup

```bash
# Download dan install
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" | sudo tee /etc/apt/sources.list.d/vscode.list > /dev/null
rm -f packages.microsoft.gpg
sudo apt install apt-transport-https
sudo apt update
sudo apt install code
```

### Recommended Extensions

- Pylance (Python)
- ESLint (JavaScript)
- GitLens
- Docker
- Remote - SSH
- Settings Sync

## 5. Konfigurasi Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"
```

## 6. Tips Tambahan

### Alias yang Berguna

Tambahkan ke `~/.zshrc`:

```bash
alias ll='ls -la'
alias gs='git status'
alias ga='git add'
alias gc='git commit'
alias gp='git push'
alias ..='cd ..'
alias ...='cd ../..'
```

### Backup Dotfiles

Simpan konfigurasi Anda di GitHub:

```bash
mkdir ~/dotfiles
mv ~/.zshrc ~/dotfiles/
mv ~/.gitconfig ~/dotfiles/
git init ~/dotfiles
# Commit dan push ke GitHub
```

## Penutup

Setup ini adalah dasar yang solid. Seiring waktu, Anda akan menemukan workflow dan tools yang sesuai dengan kebutuhan Anda. Selamat coding!
