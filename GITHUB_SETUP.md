# GitHub Setup Instructions

## Step 1: Create a GitHub Repository

1. Go to https://github.com and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., "swad-slice" or "pizza-time")
5. Choose public or private
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## Step 2: Push Your Code to GitHub

After creating the repository, run these commands in the project directory:

```bash
# Navigate to project directory
cd "C:\Users\hp\Desktop\Glimmer\swad slice\swad slice"

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Swad Slice pizza website"

# Add your GitHub repository as remote (replace YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note**: Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

## If you need to update your code later:

```bash
git add .
git commit -m "Your commit message"
git push
```


