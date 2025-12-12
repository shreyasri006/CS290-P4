#!/bin/bash
# Script to push to GitHub

echo "Checking if repository exists..."
REPO_URL="https://github.com/shreyasri006/CS290-P4.git"

# Check if remote already exists
if git remote get-url origin 2>/dev/null; then
    echo "Remote already configured"
else
    echo "Adding remote origin..."
    git remote add origin $REPO_URL
fi

echo ""
echo "Attempting to push to GitHub..."
echo "If the repository doesn't exist yet, you'll need to:"
echo "1. Go to https://github.com/new"
echo "2. Create a repository named 'CS290-P4'"
echo "3. Make it public or private as you prefer"
echo "4. Don't initialize with README (we already have one)"
echo "5. Then run this script again or: git push -u origin main"
echo ""

git push -u origin main 2>&1 || echo "Push failed. Please create the repository on GitHub first."
