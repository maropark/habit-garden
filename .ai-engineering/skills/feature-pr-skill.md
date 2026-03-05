# Feature Completion & PR Skill

## Description
This skill automates the process of cataloguing completed work for a feature/task, committing it to a branch, and creating a PR for review.

## Workflow

### Step 1: Catalogue Work Complete
1. Run `git status` to see all changes
2. Run `git diff --stat` to see summary of changes
3. Create/update a completion summary in `.ai-engineering/` folder with:
   - Feature/milestone name
   - Date completed
   - Files changed (new and modified)
   - Scope summary
   - Verification status

### Step 2: Commit Changes
1. Stage all relevant files: `git add <files>`
2. Create commit with descriptive message following conventional commits:
   - Format: `feat: Complete Milestone X - [feature name]`
   - Example: `feat: Complete Milestone 1 - Core Habit Tracking`

### Step 3: Push Branch
1. Push to remote: `git push -u origin <branch-name>`

### Step 4: Create PR
1. Use `gh pr create` to create pull request
2. Include:
   - Title: `[Milestone X] [Feature Name]`
   - Body with completion summary
   - Link to any relevant tracking docs

### Step 5: Return PR Link
Provide user with PR URL for review and approval.

## Usage
When user says "create PR for [feature]", run this skill.

## Example
User: "create pr for milestone 1"
→ Creates commit, pushes branch, returns PR link
